# CLI Reference

The `pal` command-line tool provides 100+ commands for managing shares, transfers, pals, sync, and more.

## Installation

```bash
npm install -g pal-explorer-cli
```

Requires Node.js 20+. Also included with the desktop app.

## Command Groups

| Group | Commands | Description |
|-------|----------|-------------|
| [Identity](/cli/identity) | `init`, `whoami`, `register`, `recover`, `auth` | Create and manage your identity |
| [Sharing](/cli/sharing) | `share`, `list`, `revoke`, `permissions`, `share-link` | Share files and manage access |
| [Transfers](/cli/transfers) | `download`, `transfers`, `cancel`, `serve` | Download files and manage transfers |
| [Sync](/cli/sync) | `sync add/push/pull/watch/diff/resolve` | Two-way folder synchronization |
| [Files](/cli/files) | `file ls/tree/info/copy/move/delete/search` | File operations |
| [Pals & Groups](/cli/pals-and-groups) | `pal`, `group`, `nearby` | Manage contacts and groups |
| [Chat](/cli/chat) | `chat send/history/fetch` | Encrypted messaging |
| [Network](/cli/network) | `connect`, `server`, `network`, `status` | Discovery and networking |
| [Extensions](/cli/extensions) | `ext list/install/enable/create/publish` | Manage extensions |
| [Config](/cli/config) | `config list/get/set/reset` | App configuration |
| [Server](/cli/server) | `serve`, `web`, `vfs`, `explorer` | Local services |
| [Advanced](/cli/advanced) | `backup`, `billing`, `api-keys`, `compliance` | Power user features |

## Global Flags

```bash
pal --help          # Show help
pal --version       # Show version
pal <command> -h    # Command-specific help
```
