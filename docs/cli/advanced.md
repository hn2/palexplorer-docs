# Advanced Commands

## Backup & Restore

```bash
pe backup create                  # Encrypted local backup (AES-256-GCM)
pe backup restore <file>          # Restore from backup
pe cloud-backup enable            # Cloud backup (Pro)
pe cloud-backup create
pe cloud-backup restore
```

## API Keys

```bash
pe api-keys list
pe api-keys generate              # Create new API key
pe api-keys revoke <id>
```

## Billing

```bash
pe billing status                 # Current plan and usage
pe billing plans                  # Available tiers
pe billing activate <license>     # Activate Pro license
pe billing checkout [plan]        # Open Lemon Squeezy checkout
```

## Compliance (Enterprise)

```bash
pe compliance export <publicKey>  # GDPR data export
pe compliance audit               # Compliance audit log
pe sso setup <provider>           # SSO (Okta, Azure AD)
pe rbac roles                     # Role management
pe scim sync                      # SCIM directory sync
```

## Analytics & Webhooks

```bash
pe analytics events               # Transfer analytics
pe webhook add <url> <event>      # Subscribe to events
pe webhook list
pe webhook delete <id>
```

## Security

```bash
pe pin set                        # Set PIN lock
pe pin remove
pe pin status
pe scanner virus                  # Scan for malware (Pro)
pe audit                          # View audit trail
pe audit export --format json     # Export audit log
```

## Favorites & Search

```bash
pe favorite add <share-id>
pe search --filter category "*.pdf"
```

## Notifications

```bash
pe notify send <handle> "message"
pe notify config
```
