# Chat Commands

## pe chat send

Send an encrypted message to a pal.

```bash
pe chat send alice "Hey, check out this share!"
```

Messages are encrypted with NaCl `crypto_box` (E2EE).

## pe chat history

View message history with a pal.

```bash
pe chat history alice
```

## pe chat fetch

Fetch offline messages from the discovery server inbox.

```bash
pe chat fetch
```

Messages queued while you were offline are downloaded and decrypted.

## pe comment

Comment on a shared item.

```bash
pe comment add <share-id> "Great photos!"
pe comment list <share-id>
pe comment delete <comment-id>
```
