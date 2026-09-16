# Shared Web Project Workflow

This repository follows the Bear & Croc / Heat Treat ecosystem web-project convention.

## Source control
- GitHub `main` is the source of truth for production code.
- Substantial changes are developed on a short-lived branch and reviewed through a pull request before merging to `main`.
- Avoid editing production files directly on the host.

## Analytics
- Shared GA4 measurement ID: `G-VEL8E4HB7E`.
- Public ecosystem domains: `bearandcroc.com`, `heattreatsupply.com`, `heattreat.tech`, `hotzoneshop.com`.
- Analytics loads only after the visitor grants analytics consent.
- Lead-generating forms remain functional when analytics is declined or blocked.
- Preserve first-touch and latest-touch attribution where a form generates a business lead.

## Production
- Test forms and conversion paths after material changes.
- Treat accepted/saved form submissions as leads; button clicks alone are not leads.
- Keep secrets out of GitHub and source files.

## Deployment exception: Bear & Croc
Bear & Croc is hosted on HostMonster. Merges to `main` affecting `V2/**` deploy through the existing GitHub Actions FTPS workflow. This is the ecosystem's intentional hosting exception.
