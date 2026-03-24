# Transfers API

```js
await pal.transfers.download(magnetUri);
const active = await pal.transfers.list();
const stats = await pal.transfers.stats();
```

## Methods

### download(magnetUri)

Start a download.

```js
await pal.transfers.download('magnet:?xt=urn:btih:...');
```

### list()

List active transfers.

```js
const transfers = await pal.transfers.list();
// [{ id, name, progress, speed, status }]
```

### pause(id) / resume(id)

```js
await pal.transfers.pause('transfer-id');
await pal.transfers.resume('transfer-id');
```

### history()

List completed transfers.

```js
const history = await pal.transfers.history();
```

### stats()

Aggregated transfer statistics.

```js
const stats = await pal.transfers.stats();
// { totalUploaded, totalDownloaded, avgSpeed, ... }
```
