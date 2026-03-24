# Chat

End-to-end encrypted messaging between pals. Messages travel directly peer-to-peer — never stored on a server.

## Send Messages

```bash
pe chat send alice "Hey, check out my new share!"
```

## View History

```bash
pe chat history alice
```

## Fetch Offline Messages

When you're offline, messages are queued via the discovery server inbox:

```bash
pe chat fetch
```

## Encryption

Chat uses NaCl `crypto_box`:

1. Sender's Ed25519 key → Curve25519
2. Recipient's Ed25519 key → Curve25519
3. Random 24-byte nonce generated
4. Message encrypted with XSalsa20-Poly1305
5. Original message signed with Ed25519 (authenticity)
6. Sent as `{ nonce, cipher, signature }`
