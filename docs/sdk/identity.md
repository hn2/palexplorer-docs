# Identity API

```js
const me = await pal.identity.whoami();
const resolved = await pal.identity.resolve('alice');
```

## Methods

### whoami()

Get current identity.

```js
const me = await pal.identity.whoami();
// { handle, publicKey, deviceName }
```

### resolve(handle)

Resolve a handle to a public key.

```js
const result = await pal.identity.resolve('alice');
// { handle, publicKey, devices: [...] }
```

### devices(handle)

List devices for a handle.

```js
const devices = await pal.identity.devices('alice');
```

### proStatus()

Check Pro subscription status.

```js
const pro = await pal.identity.proStatus();
// { active: true, plan: 'pro', expiresAt: '...' }
```
