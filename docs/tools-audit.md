# Tools audit portal — deployment

The marketing site connects to the **Web Scrapping** Express API and Firebase project. No backend code lives in this repo.

## Environment (247 site)

Copy [`.env.example`](../.env.example) to `.env.local` and set:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE` | Public API URL (no trailing slash), e.g. `https://your-api.up.railway.app` |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase Web SDK keys (same project as API service account) |

Build and deploy as usual (`npm run build` → static export).

## API server (Web Scrapping repo)

1. Deploy API per `C:\Projects\Web Scrapping\docs\deploy-railway.md`.
2. Set **`FRONTEND_ORIGIN`** (comma-separated exact origins):
   - `http://localhost:3000` (Next.js dev)
   - `https://247digitalpro.com`
   - `https://www.247digitalpro.com` (if used)
3. Confirm health: `GET {API_BASE}/health` → `{"status":"ok",...}`.

## Firebase Console

- Enable **Phone** authentication.
- **Authorized domains**: `localhost`, production domain(s).
- Web app config must match `NEXT_PUBLIC_FIREBASE_*`.

## Routes

| Path | Purpose |
|------|---------|
| `/tools/` | Hub |
| `/tools/login/` | Phone OTP sign-in (+1 default) |
| `/tools/seo-audit/` | Website audit |
| `/tools/social-audit/` | Social audit |
| `/tools/reports/` | History + PDF |
| `/tools/profile/` | Name / company |

## E2E checklist

1. Start API locally (`PORT=3000`) with Firebase Admin configured.
2. `npm run dev` on this site with `.env.local`.
3. Sign in with a test US number; verify user in Firestore `WEBScrapping_Users`.
4. Run website audit; confirm scores and PDF download.
5. Run social audit with at least one URL.
6. Open report from **My Reports**.
7. Production: CORS + Firebase authorized domain smoke test on live URL.
