# Shares API

```js
const shares = await pal.shares.list();
const share = await pal.shares.get(shareId);
const created = await pal.shares.create({ path: './docs', name: 'Docs' });
await pal.shares.remove(shareId);
```

## Methods

### list()

List all shares.

```js
const shares = await pal.shares.list();
// [{ id, name, path, visibility, createdAt, recipients }]
```

### get(id)

Get a single share by ID.

```js
const share = await pal.shares.get('share-uuid');
```

### create(options)

Create a new share.

```js
const share = await pal.shares.create({
  path: './my-folder',
  name: 'My Files',
  visibility: 'private',
  recipients: ['alice', 'bob'],
});
```

### remove(id)

Revoke and remove a share.

```js
await pal.shares.remove('share-uuid');
```
