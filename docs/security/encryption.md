# Encryption

## File Encryption

All shared files are encrypted with **XChaCha20-Poly1305** in streaming mode (64 KB chunks).

### Encryption Flow

1. Generate random 32-byte share key
2. For each recipient: wrap key with `crypto_box_seal(shareKey, recipientCurve25519PK)`
3. Derive manifest key from share key via `crypto_kdf_derive_from_key`
4. Encrypt filename-to-hash manifest with XChaCha20-Poly1305
5. Encrypt each file as a secretstream:
   - 24-byte header
   - Sequence of `{4-byte LE chunk_len}{encrypted_chunk}`
   - Last chunk tagged with `TAG_FINAL` (authenticated termination)

### File Format

```
[24-byte header][4-byte len][encrypted chunk 1][4-byte len][encrypted chunk 2]...[TAG_FINAL chunk]
```

Each chunk is 64 KB of plaintext, producing ~64 KB + 17 bytes of ciphertext (16-byte MAC + 1-byte tag).

## Chat Encryption

Messages use **NaCl crypto_box** (XSalsa20-Poly1305):

1. Convert sender Ed25519 SK → Curve25519
2. Convert recipient Ed25519 PK → Curve25519
3. Generate random 24-byte nonce
4. Encrypt: `crypto_box_easy(message, nonce, recipientCurve, senderCurve)`
5. Sign original message: `crypto_sign_detached(message, senderSK)`
6. Send: `{ nonce, cipher, signature }`

## Manifest Encryption

The mapping of filenames to content hashes is encrypted to prevent metadata leakage:

- Key derived from share key via `crypto_kdf_derive_from_key`
- AEAD encryption (XChaCha20-Poly1305)
- Filenames in torrents are HMAC-SHA256 obfuscated

## Password Protection

Optional password protection uses **Argon2id**:

- 3 iterations
- 64 MB memory cost
- Produces 32-byte key used to double-encrypt the share key
