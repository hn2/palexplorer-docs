# Security

Palexplorer uses a zero-knowledge, end-to-end encrypted architecture. Files are encrypted before sharing and can only be decrypted by intended recipients.

## Cryptographic Primitives

| Function | Algorithm | Library |
|----------|-----------|---------|
| Identity | Ed25519 | sodium-native |
| File encryption | XChaCha20-Poly1305 secretstream | sodium-native |
| Key wrapping | ECIES (`crypto_box_seal`) | sodium-native |
| Chat encryption | NaCl `crypto_box` (XSalsa20-Poly1305) | sodium-native |
| Password hashing | Argon2id | sodium-native |
| Message signing | Ed25519 detached | sodium-native |
| Content addressing | SHA-256 | Node.js crypto |
| Filename obfuscation | HMAC-SHA256 | Node.js crypto |
| Recovery | BIP-39 mnemonic | bip39 |

## Key Hierarchy

```
BIP-39 Mnemonic (24 words, 256-bit entropy)
  └── Ed25519 Seed (32 bytes)
       ├── Ed25519 Keypair (signing, identity)
       │   └── Curve25519 Keypair (derived, key exchange)
       └── Per-Share Key (random, 32 bytes)
             └── Wrapped per-recipient via crypto_box_seal
```

## Threat Model

| Threat | Mitigation |
|--------|-----------|
| Eavesdropping | XChaCha20-Poly1305 encryption on all content |
| Impersonation | Ed25519 signatures on all protocol messages |
| Key compromise | Per-share random keys (compromise one share, not all) |
| Replay attacks | Nonce + timestamp in PAL/1.0 envelopes |
| Metadata leakage | Encrypted filename manifest, HMAC-obfuscated torrent names |
| Server compromise | Core works without servers; servers never see plaintext |
| Extension malware | AST analysis, Worker sandbox, permission model, signatures |

## Learn More

- [Encryption](/security/encryption) — File and chat encryption details
- [Key Management](/security/keys) — Storage, derivation, recovery
- [Access Control](/security/access-control) — Permissions, roles, policies
