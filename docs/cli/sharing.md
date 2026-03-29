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

## pal browse

Interactive remote file browser (REPL). Browse a peer's shares without downloading.

```bash
pal browse alice:shares              # Open interactive browser
pal browse alice:"Project Files"     # Browse a specific share
```

**REPL commands:** `ls`, `cd <dir>`, `pwd`, `get <file>` (download), `get *.mp4` (glob), `info <file>`, `find <pattern>`, `exit`

## pal share-machine

Share all drives on this machine as a single browse-mode share. Useful for PC migration.

```bash
pal share-machine                           # Share all drives
pal share-machine --with alice,bob          # Share with specific pals
pal share-machine --drives C,D             # Specific drives only
pal share-machine --exclude /Windows       # Exclude paths
pal share-machine --include-system         # Include system files
```

## pal transfer

On-demand file transfer from a browse-mode share.

```bash
pal transfer start alice:"Project Files"/report.pdf ~/Downloads
pal transfer list                          # Active on-demand transfers
pal transfer pause <id>
pal transfer resume <id>
pal transfer cancel <id>
```
