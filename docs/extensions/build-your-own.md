# Build Your Own Extension

Create a Palexplorer extension in under a minute.

## Quick Start

### 1. Scaffold

```bash
pe ext create my-extension
cd ~/.palexplorer/extensions/my-extension
```

This creates:
- `extension.json` — Manifest (hooks, permissions, config)
- `index.js` — Entry point (activate/deactivate)
- `test/` — Test template
- `README.md` — Documentation
- `docs/PLAN.md` — Design document

### 2. Write Your Extension

```js
export function activate(ctx) {
  ctx.logger.info('My extension activated!');

  ctx.hooks.on('after:share:create', async ({ shareId, name }) => {
    ctx.logger.info(`New share: ${name} (${shareId})`);

    // Persist data across sessions
    const count = (ctx.store.get('shareCount') || 0) + 1;
    ctx.store.set('shareCount', count);
  });

  ctx.hooks.on('after:download:complete', async ({ name, size }) => {
    ctx.logger.info(`Downloaded: ${name} (${size} bytes)`);
  });
}

export function deactivate() {
  // Cleanup: close connections, flush data
}
```

### 3. Enable & Test

```bash
pe ext enable my-extension
pe ext info my-extension
pe ext list
```

## What's Next

- [Manifest Reference](/extensions/manifest) — Configure your extension
- [Context API](/extensions/context-api) — Full API reference
- [Hooks & Events](/extensions/hooks) — React to shares, transfers, peers
- [Permissions](/extensions/permissions) — Declare what your extension needs
- [Security Model](/extensions/security) — How sandboxing works
- [Testing](/extensions/testing) — Write tests for your extension
- [Publishing](/extensions/publishing) — Ship to the Marketplace

## Example: Slack Webhook Notifier

```js
export function activate(ctx) {
  const webhookUrl = ctx.config.get('webhookUrl');
  if (!webhookUrl) {
    ctx.logger.warn('No webhook URL configured');
    return;
  }

  ctx.hooks.on('after:share:create', async ({ name, visibility }) => {
    await ctx.http(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `New share created: *${name}* (${visibility})`
      })
    });
  });

  ctx.hooks.on('after:download:complete', async ({ name, size }) => {
    const mb = (size / 1024 / 1024).toFixed(1);
    await ctx.http(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `Download complete: *${name}* (${mb} MB)`
      })
    });
  });
}

export function deactivate() {}
```

With manifest:

```json
{
  "name": "slack-notifier",
  "version": "1.0.0",
  "description": "Send Slack notifications on share and download events",
  "author": "You",
  "license": "MIT",
  "main": "index.js",
  "hooks": ["after:share:create", "after:download:complete"],
  "permissions": ["config:read", "net:http"],
  "config": {
    "webhookUrl": {
      "type": "string",
      "default": "",
      "description": "Slack incoming webhook URL"
    }
  },
  "tier": "free",
  "minAppVersion": "0.5.0"
}
```

## Example: Download Scanner

Block downloads from untrusted sources:

```js
export function activate(ctx) {
  ctx.hooks.on('before:download:start', async ({ name, magnetUri }) => {
    const blocked = ctx.config.get('blockedPatterns') || [];
    for (const pattern of blocked) {
      if (name.match(new RegExp(pattern, 'i'))) {
        return { block: true, reason: `Blocked by pattern: ${pattern}` };
      }
    }
  });
}

export function deactivate() {}
```
