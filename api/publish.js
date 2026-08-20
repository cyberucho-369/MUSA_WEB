export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  var password = (req.headers.authorization || '').replace('Bearer ', '');
  if (!password || password !== process.env.CMS_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  var REPO = 'cyberucho-369/MUSA_WEB';
  var BRANCH = process.env.GITHUB_BRANCH || 'main';
  var API = 'https://api.github.com';
  var headers = {
    'Authorization': 'Bearer ' + GITHUB_TOKEN,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github+json'
  };

  var body = req.body;
  var action = body.action;

  if (action === 'ping') return res.status(200).json({ success: true });

  if (!action || ['add', 'edit', 'delete', 'blog-add', 'blog-edit', 'blog-delete'].indexOf(action) === -1) {
    return res.status(400).json({ error: 'Invalid action' });
  }

  var DEPLOY_HOOK = 'https://api.vercel.com/v1/integrations/deploy/prj_FhYWLr4TCbMQbiLRWJZfjCL8BIED/4cZKT08Unc';

  try {
    var result;
    if (action === 'add') {
      result = await handleAdd(body, API, REPO, BRANCH, headers);
    } else if (action === 'edit') {
      result = await handleEdit(body, API, REPO, BRANCH, headers);
    } else if (action === 'delete') {
      result = await handleDelete(body, API, REPO, BRANCH, headers);
    } else if (action === 'blog-add') {
      result = await handleBlogAdd(body, API, REPO, BRANCH, headers);
    } else if (action === 'blog-edit') {
      result = await handleBlogEdit(body, API, REPO, BRANCH, headers);
    } else if (action === 'blog-delete') {
      result = await handleBlogDelete(body, API, REPO, BRANCH, headers);
    }

    fetch(DEPLOY_HOOK, { method: 'POST' }).catch(function() {});

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + (err.message || 'Unknown') });
  }
}

async function githubGet(url, headers) {
  var resp = await fetch(url, { headers: headers });
  if (!resp.ok) {
    var text = await resp.text();
    throw new Error('GitHub GET failed (' + resp.status + '): ' + text);
  }
  return resp.json();
}

async function githubPut(url, headers, data) {
  var resp = await fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data)
  });
  if (!resp.ok) {
    var text = await resp.text();
    if (resp.status === 409) throw new Error('CONFLICT');
    throw new Error('GitHub PUT failed (' + resp.status + '): ' + text);
  }
  return resp.json();
}

async function githubDelete(url, headers, data) {
  var resp = await fetch(url, {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify(data)
  });
  if (!resp.ok && resp.status !== 404) {
    var text = await resp.text();
    throw new Error('GitHub DELETE failed (' + resp.status + '): ' + text);
  }
  return resp.ok;
}

async function getWorksJson(API, REPO, BRANCH, headers) {
  var fileData = await githubGet(
    API + '/repos/' + REPO + '/contents/works.json?ref=' + BRANCH,
    headers
  );
  var content = Buffer.from(fileData.content, 'base64').toString('utf8');
  return { works: JSON.parse(content), sha: fileData.sha };
}

async function commitWorksJson(works, sha, message, API, REPO, BRANCH, headers) {
  var encoded = Buffer.from(JSON.stringify(works, null, 2)).toString('base64');
  await githubPut(
    API + '/repos/' + REPO + '/contents/works.json',
    headers,
    { message: message, content: encoded, sha: sha, branch: BRANCH }
  );
}

async function uploadFile(url, headers, message, content, branch) {
  var data = { message: message, content: content, branch: branch };
  try {
    var existing = await fetch(url + '?ref=' + branch, { headers: headers });
    if (existing.ok) {
      var file = await existing.json();
      data.sha = file.sha;
    }
  } catch (e) { /* file doesn't exist, no sha needed */ }
  return githubPut(url, headers, data);
}

function buildPosterPath(year, imdb_id, title) {
  var yearFolder = year === 'unknown' ? 'unknown_year' : year;
  var filename = imdb_id + '_' + title + '.webp';
  return { relative: yearFolder + '/' + filename, full: 'assets/images/work/' + yearFolder + '/' + filename };
}

async function handleAdd(body, API, REPO, BRANCH, headers) {
  var title = (body.title || '').trim();
  var year = (body.year || '').trim();
  var imdb_id = (body.imdb_id || '').trim();
  var imdb_link = (body.imdb_link || '').trim();
  var category = (body.category || 'film').trim();
  var image_base64 = body.image_base64 || null;

  if (!title || !year || !imdb_id) {
    throw new Error('Title, year, and imdb_id are required');
  }

  var posterRelative = '';

  if (image_base64) {
    var paths = buildPosterPath(year, imdb_id, title);
    posterRelative = paths.relative;
    var encodedPath = paths.full.split('/').map(encodeURIComponent).join('/');
    await uploadFile(
      API + '/repos/' + REPO + '/contents/' + encodedPath,
      headers, 'Add poster: ' + title + ' (' + year + ')', image_base64, BRANCH
    );
  }

  var data = await getWorksJson(API, REPO, BRANCH, headers);
  data.works.unshift({
    title: title,
    year: year,
    imdb_id: imdb_id,
    imdb_link: imdb_link,
    poster: posterRelative,
    category: category
  });

  await commitWorksJson(data.works, data.sha, 'Add work: ' + title + ' (' + year + ')', API, REPO, BRANCH, headers);
  return { success: true, action: 'add', title: title, year: year };
}

async function handleEdit(body, API, REPO, BRANCH, headers) {
  var imdb_id = (body.imdb_id || '').trim();
  if (!imdb_id) throw new Error('imdb_id is required for edit');

  var data = await getWorksJson(API, REPO, BRANCH, headers);
  var index = -1;
  for (var i = 0; i < data.works.length; i++) {
    if (data.works[i].imdb_id === imdb_id) { index = i; break; }
  }
  if (index === -1) throw new Error('Title not found: ' + imdb_id);

  var entry = data.works[index];
  var oldPoster = entry.poster;

  if (body.title) entry.title = body.title.trim();
  if (body.year) entry.year = body.year.trim();
  if (body.category) entry.category = body.category.trim();
  if (body.imdb_link) entry.imdb_link = body.imdb_link.trim();

  if (body.image_base64) {
    if (oldPoster) {
      var oldPath = 'assets/images/work/' + oldPoster;
      var oldEncodedPath = oldPath.split('/').map(encodeURIComponent).join('/');
      try {
        var oldFile = await githubGet(API + '/repos/' + REPO + '/contents/' + oldEncodedPath + '?ref=' + BRANCH, headers);
        await githubDelete(
          API + '/repos/' + REPO + '/contents/' + oldEncodedPath,
          headers,
          { message: 'Remove old poster: ' + oldPoster, sha: oldFile.sha, branch: BRANCH }
        );
      } catch (e) { /* old file may not exist */ }
    }

    var paths = buildPosterPath(entry.year, entry.imdb_id, entry.title);
    entry.poster = paths.relative;
    var encodedPath = paths.full.split('/').map(encodeURIComponent).join('/');
    await uploadFile(
      API + '/repos/' + REPO + '/contents/' + encodedPath,
      headers, 'Update poster: ' + entry.title, body.image_base64, BRANCH
    );
  }

  data.works[index] = entry;
  await commitWorksJson(data.works, data.sha, 'Edit work: ' + entry.title + ' (' + entry.year + ')', API, REPO, BRANCH, headers);
  return { success: true, action: 'edit', title: entry.title, year: entry.year };
}

async function handleDelete(body, API, REPO, BRANCH, headers) {
  var imdb_id = (body.imdb_id || '').trim();
  if (!imdb_id) throw new Error('imdb_id is required for delete');

  var data = await getWorksJson(API, REPO, BRANCH, headers);
  var index = -1;
  for (var i = 0; i < data.works.length; i++) {
    if (data.works[i].imdb_id === imdb_id) { index = i; break; }
  }
  if (index === -1) throw new Error('Title not found: ' + imdb_id);

  var entry = data.works[index];

  if (entry.poster) {
    var posterPath = 'assets/images/work/' + entry.poster;
    var encodedPath = posterPath.split('/').map(encodeURIComponent).join('/');
    try {
      var posterFile = await githubGet(API + '/repos/' + REPO + '/contents/' + encodedPath + '?ref=' + BRANCH, headers);
      await githubDelete(
        API + '/repos/' + REPO + '/contents/' + encodedPath,
        headers,
        { message: 'Remove poster: ' + entry.title, sha: posterFile.sha, branch: BRANCH }
      );
    } catch (e) { /* poster may not exist */ }
  }

  data.works.splice(index, 1);
  await commitWorksJson(data.works, data.sha, 'Delete work: ' + entry.title + ' (' + entry.year + ')', API, REPO, BRANCH, headers);
  return { success: true, action: 'delete', title: entry.title };
}

// ═══════════════════════════════════════════════════════════════════
// BLOG HANDLERS
// ═══════════════════════════════════════════════════════════════════

async function getPostsJson(API, REPO, BRANCH, headers) {
  var fileData = await githubGet(
    API + '/repos/' + REPO + '/contents/posts.json?ref=' + BRANCH,
    headers
  );
  var content = Buffer.from(fileData.content, 'base64').toString('utf8');
  return { posts: JSON.parse(content), sha: fileData.sha };
}

async function commitPostsJson(posts, sha, message, API, REPO, BRANCH, headers) {
  var encoded = Buffer.from(JSON.stringify(posts, null, 2)).toString('base64');
  await githubPut(
    API + '/repos/' + REPO + '/contents/posts.json',
    headers,
    { message: message, content: encoded, sha: sha, branch: BRANCH }
  );
}

function buildBlogImagePath(id, title) {
  var slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 60);
  var filename = id + '_' + slug + '.webp';
  return { filename: filename, full: 'assets/images/blog/' + filename };
}

async function handleBlogAdd(body, API, REPO, BRANCH, headers) {
  var id = (body.id || '').trim();
  var title = (body.title || '').trim();
  var date = (body.date || '').trim();
  var link = (body.link || '').trim();
  var bodyText = (body.body || '').trim();
  var image_base64 = body.image_base64 || null;

  if (!id || !title || !date || !bodyText) {
    throw new Error('id, title, date, and body are required');
  }

  var imageFilename = '';

  if (image_base64) {
    var paths = buildBlogImagePath(id, title);
    imageFilename = paths.filename;
    var encodedPath = paths.full.split('/').map(encodeURIComponent).join('/');
    await uploadFile(
      API + '/repos/' + REPO + '/contents/' + encodedPath,
      headers, 'Add blog image: ' + title, image_base64, BRANCH
    );
  }

  var data = await getPostsJson(API, REPO, BRANCH, headers);
  data.posts.unshift({
    id: id,
    title: title,
    date: date,
    link: link,
    image: imageFilename,
    body: bodyText
  });

  await commitPostsJson(data.posts, data.sha, 'Add blog post: ' + title, API, REPO, BRANCH, headers);
  return { success: true, action: 'blog-add', title: title };
}

async function handleBlogEdit(body, API, REPO, BRANCH, headers) {
  var id = (body.id || '').trim();
  if (!id) throw new Error('id is required for blog edit');

  var data = await getPostsJson(API, REPO, BRANCH, headers);
  var index = -1;
  for (var i = 0; i < data.posts.length; i++) {
    if (data.posts[i].id === id) { index = i; break; }
  }
  if (index === -1) throw new Error('Post not found: ' + id);

  var entry = data.posts[index];
  var oldImage = entry.image;

  if (body.title) entry.title = body.title.trim();
  if (body.date) entry.date = body.date.trim();
  entry.link = (body.link || '').trim();
  if (body.body) entry.body = body.body.trim();

  if (body.remove_image && oldImage) {
    var oldPath = 'assets/images/blog/' + oldImage;
    var oldEncodedPath = oldPath.split('/').map(encodeURIComponent).join('/');
    try {
      var oldFile = await githubGet(API + '/repos/' + REPO + '/contents/' + oldEncodedPath + '?ref=' + BRANCH, headers);
      await githubDelete(
        API + '/repos/' + REPO + '/contents/' + oldEncodedPath,
        headers,
        { message: 'Remove blog image: ' + oldImage, sha: oldFile.sha, branch: BRANCH }
      );
    } catch (e) { /* old file may not exist */ }
    entry.image = '';
  }

  if (body.image_base64) {
    if (oldImage) {
      var oldImgPath = 'assets/images/blog/' + oldImage;
      var oldImgEnc = oldImgPath.split('/').map(encodeURIComponent).join('/');
      try {
        var existingFile = await githubGet(API + '/repos/' + REPO + '/contents/' + oldImgEnc + '?ref=' + BRANCH, headers);
        await githubDelete(
          API + '/repos/' + REPO + '/contents/' + oldImgEnc,
          headers,
          { message: 'Remove old blog image: ' + oldImage, sha: existingFile.sha, branch: BRANCH }
        );
      } catch (e) { /* old file may not exist */ }
    }

    var paths = buildBlogImagePath(entry.id, entry.title);
    entry.image = paths.filename;
    var encodedPath = paths.full.split('/').map(encodeURIComponent).join('/');
    await uploadFile(
      API + '/repos/' + REPO + '/contents/' + encodedPath,
      headers, 'Update blog image: ' + entry.title, body.image_base64, BRANCH
    );
  }

  data.posts[index] = entry;
  await commitPostsJson(data.posts, data.sha, 'Edit blog post: ' + entry.title, API, REPO, BRANCH, headers);
  return { success: true, action: 'blog-edit', title: entry.title };
}

async function handleBlogDelete(body, API, REPO, BRANCH, headers) {
  var id = (body.id || '').trim();
  if (!id) throw new Error('id is required for blog delete');

  var data = await getPostsJson(API, REPO, BRANCH, headers);
  var index = -1;
  for (var i = 0; i < data.posts.length; i++) {
    if (data.posts[i].id === id) { index = i; break; }
  }
  if (index === -1) throw new Error('Post not found: ' + id);

  var entry = data.posts[index];

  if (entry.image) {
    var imgPath = 'assets/images/blog/' + entry.image;
    var encodedPath = imgPath.split('/').map(encodeURIComponent).join('/');
    try {
      var imgFile = await githubGet(API + '/repos/' + REPO + '/contents/' + encodedPath + '?ref=' + BRANCH, headers);
      await githubDelete(
        API + '/repos/' + REPO + '/contents/' + encodedPath,
        headers,
        { message: 'Remove blog image: ' + entry.title, sha: imgFile.sha, branch: BRANCH }
      );
    } catch (e) { /* image may not exist */ }
  }

  data.posts.splice(index, 1);
  await commitPostsJson(data.posts, data.sha, 'Delete blog post: ' + entry.title, API, REPO, BRANCH, headers);
  return { success: true, action: 'blog-delete', title: entry.title };
}
