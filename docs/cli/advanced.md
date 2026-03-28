# Advanced Commands

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
