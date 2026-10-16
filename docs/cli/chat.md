# Chat Commands

## pal chat send

Send an encrypted message to a pal.

```bash
pal chat send alice "Hey, check out this share!"
```

Messages are encrypted with NaCl `crypto_box` (E2EE).

## pal chat history

View message history with a pal.

```bash
pal chat history alice
```

## pal chat fetch

Fetch offline messages from the discovery server inbox.

```bash
pal chat fetch
```

Messages queued while you were offline are downloaded and decrypted.

## pal chat flush

Retry delivering queued offline messages.

```bash
pal chat flush
```

## pal comment

Comment on a shared item.

```bash
pal comment add <share-id> "Great photos!"
pal comment list <share-id>
pal comment delete <comment-id>
```
