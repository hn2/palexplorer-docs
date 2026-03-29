# Advanced Commands

## pal system

System health dashboard — shows identity, P2P connections, active shares, transfer stats, memory usage, and extension status.

```bash
pal system                             # Full health dashboard
pal system --json                      # Machine-readable output
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
pal cloud-backup enable            # Cloud backup (Pro)
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
pal scanner virus                  # Scan for malware (Pro)
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
