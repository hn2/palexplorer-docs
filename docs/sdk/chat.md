# Chat API

```js
await pal.chat.send('alice', 'Hello!');
const history = await pal.chat.history('alice');
```

## Methods

### send(handle, message)

Send an encrypted message.

```js
await pal.chat.send('alice', 'Check out my new share!');
```

### history(handle)

Get message history with a pal.

```js
const messages = await pal.chat.history('alice');
// [{ from, to, text, timestamp, encrypted: true }]
```

### fetch()

Fetch offline messages from the discovery server inbox.

```js
const messages = await pal.chat.fetch();
```
