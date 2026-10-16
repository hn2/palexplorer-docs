# Groups API

```js
const groups = await pal.groups.list();
await pal.groups.create('Team Alpha');
await pal.groups.addMembers('group-id', ['alice', 'bob']);
```

## Methods

### list()

List all groups.

```js
const groups = await pal.groups.list();
// [{ id, name, members: [...] }]
```

### create(name)

Create a new group.

```js
const group = await pal.groups.create('Team Alpha');
```

### addMembers(id, handles)

Add members to a group.

```js
await pal.groups.addMembers('group-id', ['alice', 'bob']);
```

### removeMembers(id, handles)

```js
await pal.groups.removeMembers('group-id', ['bob']);
```

### delete(id)

Delete a group.

```js
await pal.groups.delete('group-id');
```
