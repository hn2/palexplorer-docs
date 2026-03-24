# Sharing Files

## Create a Share

```bash
# Basic share
pe share ./my-folder --name "Project Files"

# Private share with specific recipients
pe share ./report.pdf --name "Q4 Report" --with alice,bob

# Public share (anyone with link)
pe share ./photos --name "Vacation" -v public

# Password-protected share
pe share ./sensitive.zip --name "Financials" --password

# With expiry and download limits (Pro)
pe share ./release.zip --name "Beta Build" --expires 24h --max-downloads 100
```

## Visibility Levels

| Level | Who can access | How |
|-------|---------------|-----|
| `private` | Named recipients only | Encryption key wrapped per-recipient |
| `public` | Anyone with the magnet link | Key embedded in magnet |
| `global` | Anyone (discoverable) | Published to discovery server |
| `link-only` | Anyone with the share link | Time-limited URL |
| `group` | Group members | Key wrapped per-member |
| `network` | Organization members | Network-scoped access |

## Manage Shares

```bash
# List all shares
pe list

# Rename a share
pe share-rename <share-id> "New Name"

# Revoke (stop sharing)
pe revoke <share-id>
```

## Share Links

Generate downloadable links for recipients who don't have Palexplorer:

```bash
pe share-link add <share-id>
pe share-link list <share-id>
pe share-link remove <link-id>
```

## Permissions

Control what each recipient can do:

```bash
# View permissions
pe permissions <share-id>

# Grant write access
pe permissions grant <share-id> <public-key> write

# Revoke all access
pe permissions revoke <share-id> <public-key>
```

| Permission | Description |
|-----------|-------------|
| `read` | View and list files |
| `write` | Modify files |
| `delete` | Remove files |
| `canShare` | Re-share with others |
| `drillDown` | Browse subdirectories |

## Remote Browsing

Browse a peer's shares without downloading:

```bash
pe remote browse alice
pe remote files alice "Project Files"
pe remote download alice "Project Files"
```

## Encryption

Every share is encrypted with XChaCha20-Poly1305:

1. Random 32-byte share key generated
2. Key wrapped per-recipient via `crypto_box_seal` (ECIES)
3. Files encrypted in 64KB streaming chunks
4. Filename manifest encrypted separately (prevents metadata leakage)
