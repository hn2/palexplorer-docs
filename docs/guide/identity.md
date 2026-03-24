# Identity & Recovery

## Creating an Identity

```bash
pe init "Alice"
```

This generates:
- An **Ed25519 keypair** from a BIP-39 mnemonic (24 words, 256-bit entropy)
- A **Curve25519 keypair** derived from the Ed25519 key (for key exchange)
- A **device name** (defaults to your machine hostname)

The private key is stored in your OS keystore:
- **Windows/macOS**: Keytar (OS credential manager)
- **Linux**: Encrypted file with machine-derived AES-256-GCM key

## Recovery Phrase

Your 24-word mnemonic is the **only way** to recover your identity. Palexplorer never stores it — it's shown once during setup.

```bash
pe recover "word1 word2 word3 ... word24"
```

## Handles

Handles are optional human-readable names (e.g., `@alice`) provided by the Discovery extension:

```bash
# Register a handle
pe register alice

# Resolve a handle
pe whoami
```

Registration uses challenge-response authentication with your Ed25519 key.

## Guest Mode

Guest login creates a temporary identity in memory — no keystore, no persistence:

```bash
pe login <handle>
```

Keys are wiped with `sodium_memzero()` on logout or exit.

## Multi-Device

Each device registers separately under the same handle. Devices are linked by the same Ed25519 public key:

```bash
pe device list
pe device rename "Work Laptop"
```
