# Audit API

```js
const logs = await pal.audit.list();
await pal.audit.export('json');
```

## Methods

### list(options?)

List audit log entries.

```js
const logs = await pal.audit.list();
// [{ timestamp, action, user, deviceId, details }]

// With filters
const logs = await pal.audit.list({ action: 'share:create', limit: 50 });
```

### export(format)

Export audit log.

```js
await pal.audit.export('json');
await pal.audit.export('csv');
```

### clear()

Clear audit log (Owner only).

```js
await pal.audit.clear();
```
