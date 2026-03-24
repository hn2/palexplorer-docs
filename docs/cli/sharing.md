# Sharing Commands

## pe share

Share a file or folder.

```bash
pe share <path> [options]
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
pe share ./docs --name "Project Docs"
pe share ./photo.jpg --name "Photo" --with alice,bob
pe share ./build.zip --name "Beta" -v public --expires 48h
```

## pe list

List all shares.

```bash
pe list          # Your shares
pe list --all    # All shares (including received)
```

## pe revoke

Stop sharing.

```bash
pe revoke <share-id>
```

## pe share-rename

Rename a share.

```bash
pe share-rename <share-id> "New Name"
```

## pe share-link

Manage share links.

```bash
pe share-link add <share-id>       # Create link
pe share-link list <share-id>      # List links
pe share-link remove <link-id>     # Delete link
```

## pe permissions

View and manage per-recipient permissions.

```bash
pe permissions <share-id>                          # View
pe permissions grant <share-id> <pubkey> write     # Grant
pe permissions revoke <share-id> <pubkey>          # Revoke
```

## pe remote

Browse and download from a peer's shares.

```bash
pe remote browse alice                    # List shares
pe remote files alice "Share Name"        # List files
pe remote download alice "Share Name"     # Download
```
