# Permissions

Extensions must declare required permissions in `extension.json`. High-risk permissions require explicit user approval.

## Available Permissions

### Filesystem

| Permission | Description |
|-----------|-------------|
| `fs:read` | Read files within share paths |
| `fs:write` | Write files within share paths |
| `fs:delete` | Delete files within share paths |

### Network

| Permission | Description |
|-----------|-------------|
| `net:http` | Make HTTP requests (100 req/min, 30s timeout) |
| `net:ws` | WebSocket connections |
| `net:listen` | Listen on a port |

### Configuration

| Permission | Description |
|-----------|-------------|
| `config:read` | Read extension config |
| `config:write` | Write extension config |

### Identity

| Permission | Description |
|-----------|-------------|
| `identity:read` | Read handle and public key |
| `identity:write` | Modify identity settings |

### Data

| Permission | Description |
|-----------|-------------|
| `shares:read` | List and read share metadata |
| `shares:write` | Create or modify shares |
| `transfers:read` | Read transfer history and stats |
| `peers:read` | List pals |
| `messages:send` | Send chat messages |
| `messages:read` | Read chat messages |

### System

| Permission | Description |
|-----------|-------------|
| `schedule:write` | Create scheduled tasks |
| `clipboard` | Access clipboard |
| `notifications` | Show OS notifications |
| `audit:read` | Read audit log |
| `audit:write` | Write to audit log |

### Special

| Permission | Description |
|-----------|-------------|
| `exec:<command>` | Execute a specific system command (e.g., `exec:clamdscan`) |

## High-Risk Permissions

These require explicit user approval before the extension can run:

::: warning
`fs:write`, `fs:delete`, `net:http`, `net:ws`, `messages:send`, `shares:write`
:::

Extensions requesting 3+ high-risk permissions are classified as high-risk.

## Limits

- Maximum **10 permissions** per extension
- Maximum **20 hooks** per extension
- Permissions checked on every API call at runtime
