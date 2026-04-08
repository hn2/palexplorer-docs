# palexplorer-docs

VitePress documentation site for Palexplorer. Published at docs.palexplorer.com.

## Stack
- **Framework**: VitePress 1.6.4
- **Content**: 54 markdown pages in docs/

## Commands
- `npm run dev` — Local dev server with HMR
- `npm run build` — Static site generation to docs/.vitepress/dist/
- `npm run preview` — Preview built site locally

## Structure
- `docs/` — Content root (all .md files)
- `docs/guide/` — User guide (11 pages)
- `docs/cli/` — CLI reference (14 pages)
- `docs/extensions/` — Extension docs (9 pages)
- `docs/sdk/` — SDK docs (9 pages)
- `docs/architecture/` — Architecture (4 pages)
- `docs/security/` — Security (4 pages)
- `.vitepress/config.mjs` — Navigation, sidebar, theme config

<important>
- Pricing must match palexplorer-server billing config and palexplorer-www pricing page
- CLI docs must stay in sync with `pal --help` output
- Stub extensions must be clearly marked as "Planned" not "Available"
- Proprietary software — no GitHub links or open-source references
</important>
