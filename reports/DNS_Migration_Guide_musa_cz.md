# Přesměrování DNS — musa.cz na Vercel

**Doména:** musa.cz
**Datum:** říjen 2026

---

## Co je potřeba udělat

Přesměřujte webový provoz domény `musa.cz` na servery Vercel. E-mailové záznamy (MX, SPF, DKIM) ponechte beze změny.

---

## DNS záznamy — nové hodnoty

| Typ   | Název (Host) | Hodnota                                  | TTL  |
|-------|-------------|------------------------------------------|------|
| A     | `@`         | `216.198.79.1`                           | 3600 |
| CNAME | `www`       | `c248652c9d1152bb.vercel-dns-017.com.`   | 3600 |

Stávající A a AAAA záznamy pro `@` a `www`, které směřují na původní hosting, odstraňte.

**MX záznamy a TXT záznamy (e-mail) neměňte.**

---

## SSL certifikát

Není potřeba řešit — Vercel si certifikát zajistí automaticky.

---

Děkujeme.
MUSA, Ltd. — info@musa.cz — +420 724 029 525
