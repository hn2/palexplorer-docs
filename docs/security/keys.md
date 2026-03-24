# Key Management

## Key Generation

Identity keys are generated deterministically from a BIP-39 mnemonic:

```
24-word mnemonic → SHA-512 → Ed25519 seed (32 bytes) → Ed25519 keypair
```

The mnemonic provides 256 bits of entropy and serves as the recovery mechanism.

## Key Storage

| Key Type | Storage |
|----------|---------|
| Ed25519 private key | OS keystore (Keytar on Windows/macOS) |
| Share encryption keys | OS keystore (`pal-share-keys` service) |
| PIN hash | OS keystore (`pal-explorer` service) |
| Public key | Config file (plaintext) |
| Mnemonic | Shown once at creation, never stored |

**Linux fallback**: When Keytar is unavailable, keys are stored in an encrypted file using AES-256-GCM with a machine-derived key.

## Key Derivation

| Purpose | Method |
|---------|--------|
| Identity → Key exchange | Ed25519 → Curve25519 (`crypto_sign_ed25519_sk_to_curve25519`) |
| Share key → Manifest key | `crypto_kdf_derive_from_key(shareKey, subkey_id=1)` |
| Password → Encryption key | Argon2id (3 iterations, 64 MB) |
| Mnemonic → Seed | BIP-39 standard |

## Recovery

To recover your identity on a new device:

```bash
pe recover "word1 word2 word3 ... word24"
```

This deterministically regenerates the same Ed25519 keypair from the mnemonic.

## Key Rotation

Share keys are per-share and random. If a share is compromised, only that share's content is affected. Revoke the share and create a new one with a fresh key.

Identity keys are tied to the mnemonic and cannot be rotated without creating a new identity.
