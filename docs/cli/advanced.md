# Advanced Commands

## pal system

System health dashboard — shows identity, P2P connections, active shares, transfer stats, memory usage, and extension status.

```bash
pal system                             # Full health dashboard
pal system --json                      # Machine-readable output
```

## pal diag

Network diagnostics.

```bash
pal diag ping <handle>                 # Ping a peer
pal diag trace <handle>                # Traceroute to peer
pal diag report                        # Full diagnostic report
pal diag stats                         # Real-time network stats
```

## pal org

Organization management (Enterprise).

```bash
pal org create "Acme Corp"             # Create organization
pal org list                           # List organizations
pal org info <org-id>                  # Show org details
pal org invite <org-id> <handle>       # Invite member
pal org remove <org-id> <handle>       # Remove member
pal org subscribe <org-id> <plan>      # Subscribe org to plan
pal org billing <org-id>               # Org billing details
```

## pal dept

Department management within an organization (Enterprise).

```bash
pal dept create <org-id> "Engineering"
pal dept list <org-id>
pal dept add <dept-id> <handle>
pal dept remove <dept-id> <handle>
```

## pal workspace

Workspace management for organizing shares and projects.

```bash
pal workspace list                     # List workspaces
pal workspace create "My Project"      # Create workspace
pal workspace delete <id>              # Delete workspace
pal workspace add <id> <share-id>      # Add share to workspace
pal workspace remove <id> <share-id>   # Remove share from workspace
```

## pal relay

TURN relay management (Pro).

```bash
pal relay status                       # Show relay server status
pal relay start                        # Start self-hosted relay
pal relay stop                         # Stop relay
pal relay config                       # Edit relay config
```

## pal stream

Media streaming.

```bash
pal stream local <file>                # Stream a local file
pal stream remote <handle>:<file>      # Stream from peer
pal stream broadcast <file>            # Broadcast to all connected peers
pal stream join <handle>               # Join a peer's stream
pal stream stop                        # Stop streaming
pal stream status                      # Show streaming status
pal stream transport                   # Show active transport info
```

## pal subscribe / unsubscribe

Subscribe to a peer's share updates.

```bash
pal subscribe <share-id>               # Subscribe to share updates
pal unsubscribe <share-id>             # Unsubscribe
pal subscriptions                      # List active subscriptions
```

## pal folder-sync

Bi-directional folder sync with auto-conflict resolution.

```bash
pal folder-sync add <local> <remote>   # Add sync pair
pal folder-sync list                   # List sync pairs
pal folder-sync remove <id>            # Remove sync pair
pal folder-sync status                 # Show sync status
```

## pal privacy

Privacy controls.

```bash
pal privacy status                     # Show privacy settings
pal privacy set <key> <value>          # Update privacy setting
```

## pal credits

Show licensing and attribution info.

```bash
pal credits
```

## pal cdn

CDN management for hosted shares (Pro).

```bash
pal cdn status                         # CDN usage stats
pal cdn purge <share-id>               # Purge CDN cache
```

## pal admin

Admin-level management (requires admin role).

```bash
pal admin setup                        # Initial server setup
pal admin auth                         # Manage admin credentials
pal admin reset                        # Factory reset
pal admin whoami                       # Show admin identity
```

## pal validate

Validate configuration and data integrity.

```bash
pal validate                           # Run all validation checks
pal validate --fix                     # Auto-fix issues
```

## CLI Autocorrect & Shell Completion

The CLI includes autocorrect for mistyped commands:

```bash
pal transfres                          # Suggests: pal transfers
pal shre ./file                        # Suggests: pal share
```

Generate shell completion scripts:

```bash
pal completion bash >> ~/.bashrc       # Bash
pal completion zsh >> ~/.zshrc         # Zsh
pal completion fish > ~/.config/fish/completions/pal.fish
```

## Multi-Value Flags

19 commands support comma-separated values for flags that accept multiple inputs:

```bash
pal share ./docs --with alice,bob,charlie
pal pals add alice,bob,charlie
pal group add "Team" alice,bob,charlie
pal revoke id1,id2,id3
```

## Backup & Restore

```bash
pal backup create                  # Encrypted local backup (AES-256-GCM)
pal backup restore <file>          # Restore from backup
pal cloud-backup enable            # Cloud backup (Pro — coming soon)
pal cloud-backup create
pal cloud-backup restore
```

## API Keys

```bash
pal api-keys list
pal api-keys generate              # Create new API key
pal api-keys revoke <id>
```

## Billing

```bash
pal billing status                 # Current plan and usage
pal billing plans                  # Available tiers
pal billing activate <license>     # Activate Pro license
pal billing checkout [plan]        # Open Lemon Squeezy checkout
```

## Compliance (Enterprise)

```bash
pal compliance export <publicKey>  # GDPR data export
pal compliance audit               # Compliance audit log
pal sso setup <provider>           # SSO (Okta, Azure AD)
pal rbac roles                     # Role management
pal scim sync                      # SCIM directory sync
```

## Analytics & Webhooks

```bash
pal analytics events               # Transfer analytics
pal webhook add <url> <event>      # Subscribe to events
pal webhook list
pal webhook delete <id>
```

## Security

```bash
pal pin set                        # Set PIN lock
pal pin remove
pal pin status
pal scanner virus                  # Scan for malware (Enterprise)
pal audit                          # View audit trail
pal audit export --format json     # Export audit log
```

## Favorites & Search

```bash
pal favorite add <share-id>
pal search --filter category "*.pdf"
```

## Notifications

```bash
pal notify send <handle> "message"
pal notify config
```
