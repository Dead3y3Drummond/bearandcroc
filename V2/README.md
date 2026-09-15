# Bear & Croc Website — V2

Canonical V2 website selected for Bear & Croc.

## Files
- `index.html` — site markup
- `styles.css` — site styling
- `app.js` — Equipment Health Check scoring and submission
- `submit-assessment.php` — server-side Resend delivery endpoint

## Resend setup
The PHP endpoint reads the API key from the server environment variable `RESEND_API_KEY`. Never commit the API key to GitHub or expose it in browser JavaScript.

Verified sending domain: `bearandcroc.com`. Assessment submissions are sent to `sales@bearandcroc.com` from `website@bearandcroc.com`, with the visitor email set as Reply-To.


## Production deployment
GitHub Actions deploys the contents of `V2/` to Hostmonster over explicit FTPS. Configure these repository Actions secrets:

- `BNC_FTP_SERVER` — FTP hostname shown by Hostmonster/Bluehost
- `BNC_FTP_USERNAME` — FTP account username
- `BNC_FTP_PASSWORD` — FTP account password
- `BNC_FTP_SERVER_DIR` — directory presented to the FTP account that serves bearandcroc.com (commonly `public_html/` for the primary account, or `/` for a domain-scoped FTP account)
- `BNC_RESEND_API_KEY` — Resend API key authorized for bearandcroc.com

Run **Actions → Deploy Bear & Croc V2 → Run workflow** for the first deployment. Later pushes that change files inside `V2/` deploy automatically.

The workflow generates `.bearandcroc-secrets.php` only in the deployment workspace and uploads it with the site. It is never committed. `V2/.htaccess` blocks web access to that file.
