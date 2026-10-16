# Extension Security Model

Palexplorer uses defense-in-depth to protect users from malicious extensions.

## Bundled vs Community

| | Bundled (`@palexplorer/*`) | Community |
|---|---|---|
| **Execution** | In-process (trusted) | Worker thread sandbox (64 MB) |
| **Signature** | Not required | Ed25519 signature required |
| **AST scan** | Optional | Mandatory |
| **Permission approval** | Automatic | User must approve |
| **Maintained by** | Palexplorer team | Third-party developers |

## Security Layers

### 1. Manifest Validation

Before loading, the manifest is validated:
- Name, version, description within limits
- Main file is `.js`, no path traversal
- Permissions from valid set (max 10)
- Hooks from valid set (max 20)

### 2. AST Security Analysis

Community extensions are scanned with an AST analyzer (acorn + acorn-walk) that detects:

**Blocked imports:**
- `child_process`, `cluster`, `dgram`, `dns`, `http2`, `inspector`, `net`, `repl`, `tls`, `vm`, `worker_threads`

**Dangerous patterns:**
- `eval()` and `new Function()`
- Dynamic `import()` and `require()` with non-literal paths
- `process.exit`, `process.kill`, `process.env` mutation
- Prototype pollution (`__proto__`, `constructor`, `prototype`)

### 3. PAL-EXT-SIG-V3 Hybrid Signature & Publisher Certificate Verification

All extensions (currently in Public Beta) are verified at install time and every startup using **PAL-EXT-SIG-V3** (hybrid Post-Quantum `Ed25519 + ML-DSA-65`, FIPS 204 context `'pal3-ext-sig-v1'`, `3,374`-byte `extension.sig`) or canonical **PAL-EXT-SIG-V2**:

```bash
pal ext sign ./my-extension [--cert publisherCert.json]
pal ext verify ./my-extension
pal ext cert <publisherId> <publisherPublicKey> --allow-ext "acme-*" --allow-perm "store:read"
```

- **Full-Directory Canonical Digest (`PAL-EXT-SIG-V3\n`):** Hashes the sorted file list, byte sizes, and raw contents of every file in the extension directory (rejecting symlinks, `..` path traversal, and case-insensitive filename collisions).
- **Both Classical and Post-Quantum Verification:** Requires **both** the 64-byte `Ed25519` signature and the 3,309-byte `ML-DSA-65` signature to verify (`AND` semantics).
- **No Untrusted Self-Signing (`publisherCert` Required):** Self-signed third-party keys in `extension.json` (`signerPublicKey`) are strictly rejected unless backed by a valid, non-expired, non-revoked `publisherCert` signed by the Palexplorer Team key and scoped to `allowedExtensions` and `allowedPermissions`.

### 4. Integrity Hashing

After installation, a SHA-256 hash of the manifest and entry point is stored. On every load, the hash is rechecked — if any file was modified, the extension is blocked.

### 5. Permission Approval

Users must explicitly approve permissions before an extension runs for the first time. If an update adds new permissions, approval is required again.

### 6. Worker Thread Sandbox

Community extensions run in an isolated Worker thread with:
- **64 MB memory limit**
- **No access** to the main process
- **No access** to private keys, seed phrases, or encryption keys
- **No access** to core config (identity, friends, servers)
- **No access** to other extensions' data
- **File paths scoped** to declared shares only

### 7. Auto-Disable

Extensions that fail to load 3 consecutive times are automatically disabled to prevent boot loops.

## What Extensions Cannot Access

- Ed25519 private keys or seed phrases
- XChaCha20-Poly1305 encryption keys
- PAL/2.0 protocol internals
- Raw BitTorrent/WebTorrent connections
- Core config (identity, friends, servers)
- Other extensions' data
- Files outside share paths
- Arbitrary shell commands (except declared `exec:<command>`)
