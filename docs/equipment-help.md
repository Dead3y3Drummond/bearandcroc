# Equipment Help

Customer entry: `/help/`. The homepage links to it from navigation and the hero.

A specific equipment concern becomes a customer-reported brief in three steps:
concern and production impact, optional context, then a brief the visitor can
save as text or print/save as PDF. Contact details are requested only when the
visitor chooses Bear & Croc follow-up. Unknowns are explicitly preserved.

The existing `submit-assessment.php` endpoint accepts `kind: reactive` and emails
the structured brief to the existing sales inbox, with customer Reply-To,
production impact in the subject, and a stable lead reference. This supplies the
existing intake process; it does not create a second CRM or promise a service
booking. Staff can associate the brief/reference with subsequent corrective work
and equipment history. No automatic database sync is implied.

Technical diagnostics, maintenance checks and prioritization methods remain
internal. The existing Health Check remains the broader planning entry point.
The form does not direct customers to operate or troubleshoot equipment.

## Data and reliability
- Only concern and impact are required to generate a brief.
- Name and valid email are additionally required to send it.
- Form content stays in page memory until send; reload clears it. Save brief
  provides a local copy. Photos/records can follow by email.
- HTML is escaped on screen and in email. Server limits fields and request size.
- Failed sends retain input. Identical retries reuse a Resend idempotency key;
  edits after a successful submission start a new reference.
- Existing consent-based analytics and first/latest attribution are retained.
  `generate_lead` fires only after an accepted send and only with consent.
- Deployment uses the established main-branch HostMonster workflow.

## Verification
The pull-request check lints PHP/JavaScript and exercises desktop/mobile flows,
brief export, print visibility, escaping, denied analytics, failure/retry, and
editing after success. Email responses are mocked; it does not send test messages
to sales or prove inbox delivery. Preview screenshots and PDFs are CI artifacts.
