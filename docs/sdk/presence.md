# Presence API

```js
const status = await pal.presence.check('alice');
await pal.presence.heartbeat();
```

## Methods

### check(handle)

Check if a pal is online.

```js
const status = await pal.presence.check('alice');
// { online: true, lastSeen: '2026-03-24T12:00:00Z' }
```

### heartbeat()

Send a heartbeat to the discovery server (keeps your online status active).

```js
await pal.presence.heartbeat();
```
