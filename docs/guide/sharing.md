# Sharing Files

## Create a Share

```bash
# Basic share
pal share ./my-folder --name "Project Files"

# Private share with specific recipients
pal share ./report.pdf --name "Q4 Report" --with alice,bob

# Public share (anyone with link)
pal share ./photos --name "Vacation" -v public

# Password-protected share
pal share ./sensitive.zip --name "Financials" --password

# With expiry and download limits (Pro)
pal share ./release.zip --name "Beta Build" --expires 24h --max-downloads 100
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
pal list

# Rename a share
pal share-rename <share-id> "New Name"

# Revoke (stop sharing)
pal revoke <share-id>
```

## Share Links

Generate downloadable links for recipients who don't have Palexplorer:

```bash
pal share-link add <share-id>
pal share-link list <share-id>
pal share-link remove <link-id>
```

## Permissions

Control what each recipient can do:

```bash
# View permissions
pal permissions <share-id>

# Grant write access
pal permissions grant <share-id> <public-key> write

# Revoke all access
pal permissions revoke <share-id> <public-key>
```

| Permission | Description |
|-----------|-------------|
| `read` | View and list files |
| `write` | Modify files |
| `delete` | Remove files |
| `canShare` | Re-share with others |
| `drillDown` | Browse subdirectories |

## Remote Browsing

Browse a peer's shares without downloading using the interactive REPL:

```bash
pal browse alice:shares                  # Open interactive browser
pal browse alice:"Project Files"         # Browse a specific share
```

Inside the browser: `ls`, `cd`, `pwd`, `get <file>`, `get *.mp4`, `find <pattern>`, `exit`

To transfer individual files on-demand:

```bash
pal transfer start alice:"Project Files"/report.pdf ~/Downloads
pal transfer list                        # Monitor on-demand transfers
```

## Encryption

Every share is encrypted with XChaCha20-Poly1305:

1. Random 32-byte share key generated
2. Key wrapped per-recipient via `crypto_box_seal` (ECIES)
3. Files encrypted in 64KB streaming chunks
4. Filename manifest encrypted separately (prevents metadata leakage)
