# palexplorer-docs — Beta Status

## Version & Status

- **Version**: 1.0.0
- **Status**: Beta — content complete, all prior beta blockers resolved and re-verified 2026-07-06
- **Stack**: VitePress
- **Pages**: 54+ content pages across 8 sections (mobile section added since last count)
- **Git**: Working tree clean (aside from routine doc updates)
- **CLAUDE.md**: Present
- **README.md**: Present

---

## Implemented

- **Guide** (11 pages): Getting started, installation, onboarding, core concepts
- **CLI reference** (14 pages): Command-by-command reference for the `pal` CLI — 83 command groups, audited against actual CLI output
- **Extensions docs** (9 pages): Extension framework, loading, configuration; unimplemented extensions clearly marked "Coming Soon"
- **SDK docs** (9 pages): PalexplorerClient, sub-modules, examples
- **Architecture** (4 pages): P2P stack, identity, protocol overview
- **Security** (4 pages): Encryption, key management, audit trail
- **Config** (1 page): Configuration reference
- **Pricing page**: Free / Pro / Team / Enterprise tier breakdown, including Team tier and compliance caveat
- **Mobile docs**: Full feature table for the iOS/Android app
- **Home page**: Hero, feature highlights, call to action

---

## Beta blockers — all resolved

All beta-blocker issues (#1, #3, #4, #5, #6, #7) and follow-ups (#2, #8, #9) are closed and merged:

1. ~~Audit pricing page against server billing config and palexplorer-www pricing~~ — done, includes Team tier (#9)
2. ~~Audit CLI reference against actual `pal --help` output~~ — done, count corrected to 83 (#6, #9)
3. ~~Clearly mark stub extensions as "coming soon"~~ — done (#7)
4. ~~Add README.md at root~~ — present (#3)
5. ~~Add CLAUDE.md for contributor AI context~~ — present (#4)
6. ~~Add mobile app documentation section~~ — done (#8)

---

## Gaps (non-blocking)

- **No search analytics**: No way to know what users are searching for or failing to find
- **No deployment/build docs beyond `npm run build`/`dev`/`preview`** in `CLAUDE.md` — adequate for now, no separate deploy runbook

---

## Nice-to-Have

- Search analytics (Algolia DocSearch or PostHog event tracking on search queries)
- Docs versioning strategy (v0.x vs v1.x) before stable release
- Auto-generated CLI reference from `pal --help` output to eliminate future staleness
- Contribution guide (`CONTRIBUTING.md`) covering how to add/edit pages and run VitePress locally
- Dark mode and custom theme aligned with palexplorer brand colors
