# Bear & Croc visual system

Reference v0.1.0-draft · Decision recorded October 6, 2026 (America/Detroit)

## Decision

One Bear & Croc identity, with two intentional interface families.

| Family | Applies to | Preserve |
| --- | --- | --- |
| Website and intake (`website`) | Main website, Continuity offer and health check, maintenance/service intake, other simple lead/intake forms | Charcoal, warm paper, copper; bold typographic hierarchy; structured forms and restrained rules |
| Interactive app (`app`) | Furnace Knowledge Lab, TUS workbench, Interactive Intel, diagnostic workspaces and future working applications | Blue-black and slate surfaces, light text, amber action accents, data panels and task-oriented navigation |

Furnace Trolls belongs to the app family with an established game variant. Preserve its monospace instruments, display headings, illustrated world and game controls. Do not reskin it as a generic business dashboard.

Classify by the user's activity and the containing product. A contact form or intake remains in the website family even if it has validation, multiple steps, conditional fields or a calculated result. An ongoing workspace with saved cases, diagnosis, maps, analysis, simulation or play belongs to the app family. Forms inside that workspace inherit the app theme. Public/private access, hosting provider and framework do not determine visual family.

TRBLSHTR's case workspace belongs to the app family under this decision. Its audited source currently uses the warm website palette; alignment is a separate implementation task. Its positioning remains thermal process troubleshooting, with vacuum furnaces currently supported and combustion in development.

## Status and scope

This reference records the user's two-family direction and extracts values already present in source. It proposes a common token vocabulary; it does not claim a shared component system is installed. Existing applications still own their styles. No runtime stylesheet imports, live screens or deployments change in this draft.

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

These are system-font stacks, not bundled font files. They can render differently across devices. This draft preserves that fact rather than introducing a different typeface. The Lab separately bundles `ReportSans.ttf`, `ReportSans-Bold.ttf` and `ReportSans-LICENSE.txt` for report generation; the supplied license identifies DejaVu fonts. Those report fonts are not the app UI typeface.

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

The main Bear & Croc repository audit found website styles and a shared project workflow, but no central two-family brand package. This draft fills that documentation gap. It is not evidence that no older asset exists elsewhere.

## Make this survive a change of thread

Use this GitHub folder as the reference address once adopted. Each product should carry a short local `BRAND.md` with its family, approved variant, central-reference URL and pinned commit/version. Link it from the product README and its `AGENTS.md` or equivalent development instructions. Preserve existing repository instructions when adding that pointer.

Before visual work in any thread: read the local brand record, retrieve its pinned reference, and inspect the existing screen. After work: record intentional departures and update the handoff. A chat pin or this repository's AGENTS file alone does not cause unrelated threads or repositories to load this standard.

For the stronger implementation lock, vendor the versioned tokens into each product or consume a pinned shared package. Do not fetch a mutable stylesheet from GitHub at page-load time. Shared buttons, inputs, panels and headers should follow as reviewed component work, using the appropriate family.

Capture accepted desktop and mobile screenshots for each reference screen, then compare meaningful visual changes against them before release. Those baseline screenshots and automated checks are not part of this draft. Accessibility checks still apply to actual color pairs, focus indicators and controls.

## Adoption work remaining

1. Merge/adopt the reference and record its stable version.
2. Add local family/version pointers in each product repository and handoff.
3. Integrate tokens and components as each product is next worked on; start with aligning TRBLSHTR to the app family.
4. Gather approved logo masters and any licensed font files, with provenance.
5. Capture desktop/mobile visual baselines and add targeted checks that catch unintended drift.

For each design change, distinguish proposed, approved, implemented and deployed. Update this reference, tokens and consuming project versions together when an intentional family-wide change is adopted.
