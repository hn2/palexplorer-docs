# Sharing Commands

## pal share

Share a file or folder.

```bash
pal share <path> [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--name <name>` | Share name |
| `-v, --visibility <level>` | `private`, `public`, `global`, `link-only` |
| `--with <handles>` | Comma-separated recipient handles |
| `--with-group <name>` | Share with a group |
| `--password` | Prompt for password protection |
| `--expires <duration>` | Expiry time (e.g., `24h`, `7d`) (Pro) |
| `--max-downloads <n>` | Download limit (Pro) |
| `--streamable` | Enable media streaming |

**Examples:**

```bash
pal share ./docs --name "Project Docs"
pal share ./photo.jpg --name "Photo" --with alice,bob
pal share ./build.zip --name "Beta" -v public --expires 48h
```

## pal list

List all shares.

```bash
pal list          # Your shares
pal list --all    # All shares (including received)
```

## pal revoke

Stop sharing.

```bash
pal revoke <share-id>
```

## pal share-rename

Rename a share.

```bash
pal share-rename <share-id> "New Name"
```

## pal share-link

Manage share links.

```bash
pal share-link add <share-id>       # Create link
pal share-link list <share-id>      # List links
pal share-link remove <link-id>     # Delete link
```

## pal permissions

View and manage per-recipient permissions.

```bash
pal permissions <share-id>                          # View
pal permissions grant <share-id> <pubkey> write     # Grant
pal permissions revoke <share-id> <pubkey>          # Revoke
```

## pal remote

Browse and download from a peer's shares.

```bash
pal remote browse alice                    # List shares
pal remote files alice "Share Name"        # List files
pal remote download alice "Share Name"     # Download
```
