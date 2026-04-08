# palexplorer-docs

Documentation site for Palexplorer, built with VitePress. Published at [docs.palexplorer.com](https://docs.palexplorer.com).

## Development

```bash
npm install
npm run dev     # http://localhost:5173
```

## Build & Deploy

```bash
npm run build   # Output: docs/.vitepress/dist/
npm run preview # Preview locally
```

Deploy the `docs/.vitepress/dist/` directory to any static hosting.

## Content Structure

| Section | Path | Pages |
|---------|------|-------|
| Guide | docs/guide/ | 11 |
| CLI Reference | docs/cli/ | 14 |
| Extensions | docs/extensions/ | 9 |
| SDK | docs/sdk/ | 9 |
| Architecture | docs/architecture/ | 4 |
| Security | docs/security/ | 4 |
| Config | docs/config/ | 1 |
| Home + Pricing | docs/ | 2 |

## Adding Content

1. Create a `.md` file in the appropriate section folder
2. Add the page to `.vitepress/config.mjs` sidebar configuration
3. Run `npm run dev` to preview
