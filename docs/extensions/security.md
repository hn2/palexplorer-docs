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

### 3. Ed25519 Signature Verification

Extensions must be signed with the developer's Ed25519 key:

```bash
pe ext sign ./my-extension
```

The signature covers `extension.json` + `index.js`. Unsigned extensions are rejected (unless `extensionRequireSignature=false` in dev mode).

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
- PAL/1.0 protocol internals
- Raw BitTorrent/WebTorrent connections
- Core config (identity, friends, servers)
- Other extensions' data
- Files outside share paths
- Arbitrary shell commands (except declared `exec:<command>`)
