# Hooks & Events

Extensions subscribe to hooks in `extension.json` and register listeners in `activate()`.

## Lifecycle

| Hook | Description |
|------|-------------|
| `on:app:ready` | App initialized, safe to access core APIs |
| `on:app:shutdown` | App shutting down, flush pending data |
| `on:config:change` | Extension config changed |

## Shares

| Hook | Description | Payload |
|------|-------------|---------|
| `before:share:create` | Can block with `{ block: true, reason }` | `name`, `visibility`, `recipients` |
| `after:share:create` | Share was created | `shareId`, `name`, `visibility`, `recipients` |
| `after:share:revoke` | Share was revoked | `shareId` |

## Transfers

| Hook | Description | Payload |
|------|-------------|---------|
| `before:download:start` | Can block downloads | `name`, `magnetUri` |
| `after:download:complete` | Transfer finished | `size`, `duration`, `speed`, `filePath`, `name` |

## Peers

| Hook | Description | Payload |
|------|-------------|---------|
| `on:peer:connect` | Peer connected | `handle`, `publicKey` |
| `on:peer:disconnect` | Peer disconnected | `handle`, `publicKey` |
| `on:auth:login` | User authenticated | `handle` |

## Billing

| Hook | Description | Payload |
|------|-------------|---------|
| `after:billing:upgrade` | Plan upgraded | `plan` |
| `after:billing:downgrade` | Plan downgraded | `reason` |

## Blocking Hooks

Hooks prefixed with `before:` can prevent the action by returning `{ block: true, reason }`:

```js
ctx.hooks.on('before:share:create', async ({ name, visibility }) => {
  if (visibility === 'global') {
    return { block: true, reason: 'Global shares are disabled by policy' };
  }
});

ctx.hooks.on('before:download:start', async ({ name }) => {
  if (name.endsWith('.exe')) {
    return { block: true, reason: 'Executable downloads are blocked' };
  }
});
```

::: info
Errors in hook handlers are caught and logged — they don't prevent other listeners from running.
:::

## Registering Hooks

Declare hooks in your manifest, then register in `activate()`:

```json
{
  "hooks": ["on:app:ready", "after:share:create", "after:download:complete"]
}
```

```js
export function activate(ctx) {
  ctx.hooks.on('on:app:ready', async () => {
    ctx.logger.info('App is ready');
  });

  ctx.hooks.on('after:share:create', async ({ shareId, name }) => {
    ctx.logger.info(`Share created: ${name}`);
  });
}
```
