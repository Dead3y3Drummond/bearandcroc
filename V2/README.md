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
