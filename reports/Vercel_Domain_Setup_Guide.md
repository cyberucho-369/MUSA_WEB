# Vercel — Nastavení domény musa.cz

## Krok 1 — Přihlášení

1. Otevřete https://vercel.com a přihlaste se
2. Na dashboardu klikněte na projekt **MUSA_WEB** (nebo jak se projekt jmenuje)

## Krok 2 — Přidání domény

1. V horním menu projektu klikněte na **Settings**
2. V levém menu klikněte na **Domains**
3. Do pole "Domain" napište `musa.cz`
4. Klikněte **Add**
5. Vercel se zeptá, zda chcete přidat i `www.musa.cz` — potvrďte **Yes**
6. Jako primární doménu zvolte `musa.cz` (bez www) — Vercel bude automaticky přesměrovávat `www.musa.cz` → `musa.cz`

## Krok 3 — Zobrazení DNS hodnot

Po přidání domény Vercel zobrazí DNS záznamy, které je potřeba nastavit u poskytovatele DNS. Měly by odpovídat:

- **A záznam** pro `@` → `76.76.21.21`
- **CNAME záznam** pro `www` → `cname.vercel-dns.com`

Tyto hodnoty předejte poskytovateli hostingu (viz dokument DNS_Migration_Guide_musa_cz.md).

## Krok 4 — Ověření

1. U obou domén (`musa.cz` a `www.musa.cz`) se zobrazí status
2. Dokud DNS záznamy nejsou přesměrované, uvidíte **Invalid Configuration** — to je v pořádku
3. Jakmile poskytovatel hostingu provede změny DNS, status se změní na **Valid** (může trvat 15 minut až 48 hodin)
4. SSL certifikát se vygeneruje automaticky po ověření domény

## Krok 5 — Kontrola

Jakmile status obou domén ukazuje **Valid**:

- `https://musa.cz` — zobrazí web
- `https://www.musa.cz` — přesměruje na `https://musa.cz`
- `http://musa.cz` — přesměruje na `https://musa.cz`

Hotovo.
