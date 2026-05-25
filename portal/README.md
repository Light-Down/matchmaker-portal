# Matchmaker Kundenbereich

Eigenständige Next.js-App für den geschützten Kundenbereich. Die PHP-Marketingseite bleibt separat; das Portal kann als Hostinger Node.js/Next.js-App auf einer Subdomain laufen.

## Lokal starten

```bash
npm install
npm run dev
```

Dann öffnen: `http://127.0.0.1:3100`

## Supabase Setup

1. Neues Supabase-Projekt in `eu-central-1` anlegen.
2. Migrationen aus `../supabase/migrations` per Supabase CLI oder GitHub Integration ausführen.
3. In Supabase Auth die Site URL auf `NEXT_PUBLIC_PORTAL_BASE_URL` setzen.
4. Redirect URL ergänzen: `http://127.0.0.1:3100/auth/callback` lokal und später `https://matchmaker-frankfurt.de/auth/callback` oder `https://portal.matchmaker-frankfurt.de/auth/callback`.
5. Werte aus `.env.example` in `.env` bzw. Hostinger Environment Variables setzen.
6. Admin-E-Mail in `ADMIN_EMAILS` eintragen.
7. Kunden im Adminbereich anlegen; der erste Login verknüpft den Supabase-Auth-User automatisch mit dem Client-Datensatz.

## Supabase GitHub Integration

Die Supabase-Dateien liegen bewusst im Repo-Root unter `supabase/`.

Im Supabase Dashboard:

1. `Project Settings` -> `Integrations` -> `GitHub Integration`
2. GitHub autorisieren und dieses Repository auswählen
3. Working directory: `.`
4. Optional: Automatic branching aktivieren
5. Production Deploy erst aktivieren, wenn die erste Migration lokal oder im Dashboard geprüft wurde

Per CLI:

```bash
supabase login
supabase link --project-ref <project-ref>
supabase db push --dry-run
supabase db push
```

## Deployment auf Hostinger

- App Root: `portal`
- Build Command: `npm ci && npm run build`
- Start Command: `npm run start`
- Runtime: Node.js/Next.js, kein statischer Export

Secrets wie `SUPABASE_SERVICE_ROLE_KEY` und `GEMINI_API_KEY` bleiben ausschließlich serverseitige Environment Variables. Den lokal bisher genutzten Gemini-Key vor Produktion rotieren.
