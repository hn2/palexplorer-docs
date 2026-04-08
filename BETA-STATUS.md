# palexplorer-docs — Beta Status

## Version & Status

- **Version**: 1.0.0
- **Status**: Pre-beta — content complete for existing features, multiple staleness risks before public launch
- **Stack**: VitePress
- **Pages**: 54 content pages across 8 sections
- **Git**: Working tree clean
- **Missing**: No CLAUDE.md, no README.md

---

## Implemented

- **Guide** (11 pages): Getting started, installation, onboarding, core concepts
- **CLI reference** (14 pages): Command-by-command reference for the `pal` CLI
- **Extensions docs** (9 pages): Extension framework, loading, configuration
- **SDK docs** (9 pages): PalexplorerClient, sub-modules, examples
- **Architecture** (4 pages): P2P stack, identity, protocol overview
- **Security** (4 pages): Encryption, key management, audit trail
- **Config** (1 page): Configuration reference
- **Pricing page**: Free / Pro / Enterprise tier breakdown
- **Home page**: Hero, feature highlights, call to action

---

## Gaps

- **No CLAUDE.md**: No project-level AI instructions; onboarding for contributors is missing
- **No README.md**: No root-level README explaining how to run, build, or deploy the docs site
- **Pricing may be out of sync**: Pricing page content has not been audited against palexplorer-server billing config or the website pricing page
- **CLI docs may be stale**: Desktop reports 78 CLI commands; docs may reference a different count or missing commands added after last doc pass
- **Extension docs list stubs**: 30+ extensions documented but 32 of 33 are stubs in palexplorer-extensions — docs may describe planned behavior as if implemented
- **No mobile docs**: React Native app (17 screens, full P2P runtime) is not covered anywhere in the docs site
- **No search analytics**: No way to know what users are searching for or failing to find
- **No deployment/build docs**: How to build (`npm run docs:build`), deploy, and preview the docs site is not documented anywhere

---

## Beta Blockers

1. **Audit pricing page** against server billing config and palexplorer-www pricing — all three must agree before beta
2. **Audit CLI reference** against actual `pal --help` output (78 commands) and update any stale entries
3. **Clearly mark stub extensions** as "coming soon" or "planned" so docs don't promise unimplemented behavior
4. **Add README.md** at root with build/preview/deploy instructions
5. **Add CLAUDE.md** for contributor AI context

---

## Nice-to-Have

- Mobile app documentation section (install, screens, P2P runtime, push notifications)
- Search analytics (Algolia DocSearch or PostHog event tracking on search queries)
- Docs versioning strategy (v0.x vs v1.x) before stable release
- Auto-generated CLI reference from `pal --help` output to eliminate staleness
- Contribution guide (`CONTRIBUTING.md`) covering how to add/edit pages and run VitePress locally
- Dark mode and custom theme aligned with palexplorer brand colors
