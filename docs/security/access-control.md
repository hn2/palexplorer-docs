# Access Control

## Share Visibility

| Level | Access | Key Distribution |
|-------|--------|-----------------|
| `private` | Named recipients only | Key wrapped per-recipient |
| `public` | Anyone with magnet link | Key embedded in magnet |
| `global` | Discoverable by anyone | Published to discovery server |
| `link-only` | Anyone with share link | Time-limited URL |
| `group` | Group members | Key wrapped per-member |
| `network` | Organization members | Network-scoped |

## Per-Recipient Permissions

| Permission | Description |
|-----------|-------------|
| `read` | View and list files |
| `write` | Modify files |
| `delete` | Remove files |
| `canShare` | Re-share with others |
| `drillDown` | Browse subdirectories |

## Share Policies (Pro)

| Policy | Description |
|--------|-------------|
| `expiresAt` | Share expires after date/time |
| `maxDownloads` | Maximum download count |
| `allowedIPs` | CIDR IP restrictions |
| `scheduleWindow` | Time-of-day access windows |
| `bandwidthLimit` | Per-transfer speed cap |

Policies are enforced at the protocol level on `transfer.request`.

## User Roles

| Role | Shares | Users | Config | Keys |
|------|--------|-------|--------|------|
| **Owner** | Full | Manage all | Full | Keystore |
| **User** | Own only | View only | Limited | Keystore |
| **Guest** | Read only | None | None | In-memory |

## Audit Log

All actions are logged locally:

```json
{
  "timestamp": "2026-03-24T12:00:00Z",
  "action": "share:create",
  "user": "alice",
  "deviceId": "device-uuid",
  "details": { "shareId": "...", "name": "..." }
}
```

- Rolling window: 500 entries (free), 2000 entries (Pro)
- Exportable: `pe audit export --format json`
