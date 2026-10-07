# Bear & Croc visual system

Reference v1.0.0 · Adopted October 7, 2026 (America/Detroit)

**Pillar of truth:** this folder in `Dead3y3Drummond/bearandcroc`, on `main`. Approved scope: reference and project documentation only.

## Decision

One Bear & Croc identity, with two intentional interface families.

| Family | Applies to | Preserve |
| --- | --- | --- |
| Website and intake (`website`) | Main website, Continuity offer and health check, maintenance/service intake, other simple lead/intake forms | Charcoal, warm paper, copper; bold typographic hierarchy; structured forms and restrained rules |
| Interactive app (`app`) | Furnace Knowledge Lab, TUS workbench, Interactive Intel, diagnostic workspaces and future working applications | Blue-black and slate surfaces, light text, amber action accents, data panels and task-oriented navigation |

Furnace Trolls belongs to the app family with an established game variant. Preserve its monospace instruments, display headings, illustrated world and game controls. Do not reskin it as a generic business dashboard.

Classify by the user's activity and the containing product. A contact form or intake remains in the website family even if it has validation, multiple steps, conditional fields or a calculated result. An ongoing workspace with saved cases, diagnosis, maps, analysis, simulation or play belongs to the app family. Forms inside that workspace inherit the app theme. Public/private access, hosting provider and framework do not determine visual family.

TRBLSHTR's case workspace belongs to the app family under this decision. The initial source audit recorded its warm website palette; the correction is handled separately in the TRBLSHTR project thread. That historical audit is not a claim about the current deployed screen. Its positioning remains thermal process troubleshooting, with vacuum furnaces currently supported and combustion in development.

## Status and scope

This reference records the user's two-family direction and extracts values already present in source. It establishes the reference vocabulary without installing a shared component system. Existing applications still own their styles. Adoption is documentation-only: no runtime imports, styling, screens, behavior, assets, domains, access settings or deployments are changed. Integrating tokens or components requires a separately authorized implementation task.

The website and app palettes below are source-derived. Small details such as secondary button fills differ between Lab and Intel; those differences need review during component consolidation. Game-specific values are deliberate exceptions. A color's presence in a stylesheet does not mean it is suitable for every foreground/background pairing.

## Exact color reference

Nominal sRGB hex values; these are web colors, not print separations.

| Role | Website / intake | Interactive app |
| --- | --- | --- |
| Background | `#F1F0EC` | `#101820` |
| Secondary surface / panel | `#E3E0D8` | `#17232D` |
| Primary text | `#20211F` | `#EFF4F6` |
| Muted text | `#666760` | `#A9BBC7` |
| Borders / rules | `#AAA89F` | `#31424F` |
| Primary accent | `#A45F3A` copper | `#F5AA42` amber |
| Header | `#222422` charcoal | `#101820` blue-black |
| Header text | `#F7F6F2` | `#EFF4F6` |

App status colors: blue `#69B6EF`, green `#7CD5AE`, red `#FF8C83`. Pair status color with text or a symbol so meaning survives without color.

Game variant: background `#11181D`, cabinet `#1B252C`, text `#E7DFCE`, muted brand text `#8C9AA0`, cabinet border `#53606A`, brand accent `#E9A957`. Its other amber shades, gradients and illustrated colors remain in game source.

[tokens.json](tokens.json) is the machine-readable reference. [tokens.css](tokens.css) exposes opt-in `--bc-*` custom properties under `data-bc-theme="website"`, `"app"` or `"game"`. Importing the file alone does not restyle a product; components must consume the properties. Explicit foreground tokens for primary buttons are role mappings, not a claim that every current button already uses those pairs.

## Typography and font files

| Usage | Current family / fallback | Existing treatment |
| --- | --- | --- |
| Website body and headings | Arial, Helvetica, sans-serif | Heavy headings and wordmark; heading weight 900; body line height 1.5 |
| Lab and Intel interface | system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif | Base 16px / 1.5; restrained sans-serif headings |
| App readouts | ui-monospace, monospace | Used selectively for clocks, measurements and technical labels; some Lab readouts also name SFMono-Regular |
| Trolls interface | ui-monospace, SFMono-Regular, Consolas, monospace | Instrument and game interface treatment |
| Trolls main heading | Impact, 'Arial Black', sans-serif | Heavy display treatment, weight 900 |
| Trolls buttons | ui-monospace, monospace | 700 weight, 13px in the base rule |

These are system-font stacks, not bundled font files. They can render differently across devices. This reference preserves that fact rather than introducing a different typeface. The Lab separately bundles `ReportSans.ttf`, `ReportSans-Bold.ttf` and `ReportSans-LICENSE.txt` for report generation; the supplied license identifies DejaVu fonts. Those report fonts are not the app UI typeface.

A future exact-font adoption must include the licensed font bytes, family/style/weight, version, origin, checksum and license beside the file. Do not copy proprietary system font binaries into the repository. Review a typeset proof before changing an established stack. Never identify the font in a raster or generated logo by guesswork.

## Identity and components

Keep the established Bear & Croc wordmark and clear product name. Use the approved identity artwork when available; do not add a redundant B&C badge or invent another logo. The code wordmark and the bear/croc silhouette artwork are different assets. Original editable logo masters are not included or certified by this audit; gather and index them before declaring the asset kit complete.

Website treatment: large bold headlines, warm surfaces, copper interventions, square controls and clear section rules. App treatment: blue-black workspaces, slate panels, legible data, compact task controls and restrained 4px corner rounding. Retain amber for primary action and current position. Keep an app section's workflow contained; global product navigation and local task controls serve different purposes.

Do not borrow a font from Western Menace, Dustin Drennen, Busted Ice Machines or another brand just because it is already on hand. Related businesses may keep their own approved identities.

## Source audit

Files were read from their current GitHub default branches on October 6 local time / October 7 UTC, 2026. Blob identifiers make this extraction traceable; they do not establish the deployed version of a private application.

| Reference | Source file | Audited Git blob |
| --- | --- | --- |
| Website | `bearandcroc/V2/styles.css` | `4ffdf246903816f79d165f6fde54a28d26efe3d5` |
| Lab | `BNC-labs/dist/style.css` | `0cfd7086c8fb800eae2589a714a19af0198ced13` |
| Intel | `BNC-intel/app/globals.css` | `eb051bdf58f071e880d6eba781c1d323d6d3cc7b` |
| Trolls | `Furnace-Trolls/web/style.css` | `5d65608b6538eb6d80891f0239d3b5cf48637368` |
| TRBLSHTR | `TRBLSHTR/app/globals.css` | `cbee3ffedc2d6fb4b2a4963991375abf9db99c4e` |

The earlier font/color package was verified at `westernmenace`, branch `preview/proof-03-editorial-cms`, `docs/branding.md`. It records the Western Menace palette and font stacks, plus a pinned Anton candidate and license. It is not a Bear & Croc-wide standard, and Anton is not established as a Bear & Croc font.

The main Bear & Croc repository audit found website styles and a shared project workflow, but no central two-family brand package. This adopted reference fills that documentation gap. It is not evidence that no older asset exists elsewhere.

## Make this survive a change of thread

Use this GitHub folder as the authoritative reference address. Each product should carry a short local `BRAND.md` with its family, approved variant, central-reference URL and pinned commit/version. Link it from the product README and its `AGENTS.md` or equivalent development instructions. Preserve existing repository instructions when adding that pointer.

Before visual work in any thread: read the local brand record, retrieve its pinned reference, and inspect the existing screen. After work: record intentional departures and update the handoff. A chat pin or this repository's AGENTS file alone does not cause unrelated threads or repositories to load this standard.

The CSS/JSON files in this folder are reference material only. Do not import, vendor or wire them into applications as part of adopting this record. Any future token/component integration is a separately scoped implementation change. Do not fetch a mutable stylesheet from GitHub at page-load time.

Capture accepted desktop and mobile screenshots for each reference screen, then compare meaningful visual changes against them before release. Those baseline screenshots and automated checks have not been established by this documentation-only adoption; no new artwork or asset exports are being produced. Accessibility checks still apply to actual color pairs, focus indicators and controls.

## Project registry

| Repository / property | Family | Local reference |
| --- | --- | --- |
| `bearandcroc`: website, Continuity assessment and simple intakes | website | `BRAND.md` |
| `BNC-labs`: Furnace Lab and TUS Workbench | app | `BRAND.md` |
| `BNC-intel`: Interactive Intel | app | `BRAND.md` |
| `TRBLSHTR`: thermal process troubleshooting | app | `BRAND.md` |
| `Furnace-Trolls`: Night Shift | app, game variant | `BRAND.md` |

This registry declares the reference family. It is not a claim that every deployed pixel conforms or that a shared stylesheet is installed. Other intake properties inherit the website-family rule when scoped as Bear & Croc intakes; this adoption does not change separate Heat Treat Supply, HeatTreat.tech or other brand properties.

## Change control

The user's October 7 authorization is for a reference / pillar of truth, with no actual changes to properties or assets. Repository README, BRAND and development/handoff instructions carry the reference. Preserve current source, all approved assets and all live properties.

For future visual work, load the local `BRAND.md`, then its pinned central commit/version. Check the current central record for a newer approved decision; reconcile differences explicitly instead of silently upgrading. Current explicit user instructions take precedence. Record intentional approved variants and new reference versions here. Preserve historical versions through Git.

The root `AGENTS.md` makes this reference discoverable to development tools that read repository instructions. It is not an automatic cross-thread enforcement service. New projects must be given a local family/version pointer.

An asset inventory, exact licensed font packaging, accepted screenshot baselines and runtime integration remain separate work. Their absence does not authorize replacement artwork, a different typeface, a redesign or a deployment.

## Adoption history

- October 6, 2026: two-family direction recorded and source values audited; draft prepared in PR #5.
- October 7, 2026: Dustin authorized adoption as the reference/pillar of truth only, explicitly excluding actual property or asset changes. Reference version 1.0.0 records that boundary.
