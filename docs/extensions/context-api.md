# Context API

The `ctx` object passed to `activate()` provides the full extension API. Each method is permission-gated — calls without the required permission throw an error.

## ctx.hooks

**Available to all extensions.** Register event listeners.

```js
ctx.hooks.on('after:share:create', async ({ shareId, name }) => {
  // React to events
});

// Block actions in before:* hooks
ctx.hooks.on('before:share:create', async ({ name, visibility }) => {
  if (visibility === 'global') {
    return { block: true, reason: 'Global shares disabled by policy' };
  }
});
```

See [Hooks & Events](/extensions/hooks) for all available events.

## ctx.config

**Requires:** `config:read` / `config:write`

```js
ctx.config.get('key')           // Read a setting
ctx.config.set('key', value)    // Update a setting
ctx.config.getAll()             // All settings as object
```

Config keys and defaults are defined in `extension.json`.

## ctx.store

**Available to all extensions.** Persistent key-value storage.

```js
ctx.store.get('key')            // Read
ctx.store.set('key', value)     // Write (max 1 MB per value, 1000 keys)
ctx.store.delete('key')         // Remove
```

Data persists across app restarts and extension reloads.

## ctx.logger

**Available to all extensions.**

```js
ctx.logger.info('message')
ctx.logger.warn('message')
ctx.logger.error('message')
```

## ctx.app

**Available to all extensions.** Read-only app metadata.

```js
ctx.app.version     // e.g. "0.5.0"
ctx.app.platform    // "linux" | "darwin" | "win32"
ctx.app.mode        // "cli" | "gui"
ctx.app.dataDir     // Extensions directory path
ctx.app.appRoot     // App installation root
```

## ctx.identity

**Requires:** `identity:read`

```js
const { handle, publicKey } = ctx.identity.get();
```

## ctx.shares

**Requires:** `shares:read`

```js
const shares = ctx.shares.list();   // [{ id, path, type, visibility }]
const share = ctx.shares.get(id);   // Single share details
```

## ctx.peers

**Requires:** `peers:read`

```js
const peers = ctx.peers.list();     // [{ handle, publicKey }]
```

## ctx.transfers

**Requires:** `transfers:read`

```js
ctx.transfers.history()    // Download/upload history
ctx.transfers.stats()      // Aggregated statistics
```

## ctx.http

**Requires:** `net:http`

Rate-limited to 100 requests/minute. 30-second timeout.

```js
const response = await ctx.http('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' })
});
```

## ctx.fs

**Requires:** `fs:read` / `fs:write` / `fs:delete`

All paths are scoped to configured shares — no access outside.

```js
await ctx.fs.read(path, 'utf8')     // Read file
await ctx.fs.write(path, data)      // Write file
await ctx.fs.mkdir(dir)             // Create directory (recursive)
await ctx.fs.delete(path)           // Delete file
await ctx.fs.readdir(dir)           // List directory
await ctx.fs.stat(path)             // { size, isFile, isDirectory, mtime }
```

## ctx.notify

**Requires:** `notifications`

```js
ctx.notify.show('Title', 'Notification body text');
```

Shows an OS-native notification.
