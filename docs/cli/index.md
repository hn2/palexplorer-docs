# CLI Reference

The `pal` command-line tool provides 80+ command groups with 100+ subcommands for managing shares, transfers, pals, sync, and more.

## Installation

```bash
npm install -g pal-explorer-cli
```

Requires Node.js 20+. Also included with the desktop app.

## Command Groups

| Group | Commands | Description |
|-------|----------|-------------|
| [Identity](/cli/identity) | `init`, `whoami`, `register`, `verify`, `recover`, `auth`, `user`, `login`, `logout`, `device` | Create and manage your identity |
| [Sharing](/cli/sharing) | `share`, `list`, `revoke`, `permissions`, `share-link`, `comment`, `favorite` | Share files and manage access |
| [Transfers](/cli/transfers) | `download`, `transfers`, `serve` | Download files and manage transfers |
| [Sync](/cli/sync) | `sync start/push/pull/watch/status/list/remove/diff/history/schedule` | P2P folder synchronization |
| [Files](/cli/files) | `file ls/tree/info/copy/move/rename/mkdir/delete/search/open/reveal/audit` | File operations |
| [Remote](/cli/files) | `remote browse/files/download` | Browse and download from pals' shares |
| [Pals & Groups](/cli/pals-and-groups) | `pal add/list/info/remove/name`, `group`, `nearby`, `invite`, `network` | Manage contacts and groups |
| [Chat](/cli/chat) | `chat send/history/fetch/flush` | Encrypted messaging |
| [Network & Discovery](/cli/network) | `connect`, `disconnect`, `network`, `status`, `protocol`, `federation`, `search` | Discovery and networking |
| [Streaming](/cli/advanced) | `stream local/remote/broadcast/join/stop/status/transport` | Media streaming |
| [Extensions](/cli/extensions) | `ext list/install/remove/enable/disable/info/config/create` | Manage extensions |
| [Config](/cli/config) | `config list/get/set/reset` | App configuration |
| [Server & Services](/cli/server) | `serve`, `web`, `vfs`, `explorer`, `schedule`, `workspace` | Local services |
| [Billing](/cli/advanced) | `billing status/plans/activate/checkout` | Subscription management |
| [Orgs](/cli/advanced) | `org create/list/info/invite/remove/billing`, `dept` | Organization management (Enterprise) |
| [AI Assistant](/cli/ai) | `ai chat/search/config` | Natural language CLI and AI chat |
| [Advanced](/cli/advanced) | `backup`, `api-keys`, `compliance`, `org`, `relay`, `pin`, `notify`, `audit`, `scanner`, `sso`, `rbac`, `scim`, `webhook`, `analytics` | Power user and enterprise features |
| [Utilities](/cli/advanced) | `status`, `log`, `completion`, `update`, `uninstall` | App management |

## Global Flags

```bash
pal --help          # Show help
pal --version       # Show version
pal <command> -h    # Command-specific help
pal --json          # Output in JSON format
pal --log-level debug  # Set log verbosity
```

## Top-Level Aliases

```
pal connect         → pal network connect
pal disconnect      → pal network disconnect
```
