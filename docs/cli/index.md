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
| [Identity](/cli/identity) | `init`, `whoami`, `register`, `recover`, `auth`, `user`, `device` | Create and manage your identity |
| [Sharing](/cli/sharing) | `share`, `list`, `revoke`, `permissions`, `share-link`, `browse`, `share-machine`, `transfer` | Share files and manage access |
| [Transfers](/cli/transfers) | `download`, `transfers`, `serve` | Download files and manage transfers |
| [Sync](/cli/sync) | `sync add/push/pull/watch/diff/resolve`, `folder-sync` | Two-way folder synchronization |
| [Files](/cli/files) | `file ls/tree/info/copy/move/delete/search` | File operations |
| [Pals & Groups](/cli/pals-and-groups) | `pals`, `group`, `nearby`, `invite`, `network` | Manage contacts and groups |
| [Chat](/cli/chat) | `chat send/history/fetch` | Encrypted messaging |
| [Network](/cli/network) | `connect`, `server`, `status`, `protocol`, `federation` | Discovery and networking |
| [Streaming](/cli/server) | `stream local/remote/broadcast/join` | Media streaming |
| [Extensions](/cli/extensions) | `ext list/install/enable/create` | Manage extensions |
| [Config](/cli/config) | `config list/get/set/reset` | App configuration |
| [Server](/cli/server) | `serve`, `web`, `vfs`, `explorer`, `schedule` | Local services |
| [AI Assistant](/cli/ai) | `ai chat/search/config` | Natural language CLI and AI chat |
| [Advanced](/cli/advanced) | `backup`, `billing`, `api-keys`, `compliance`, `org`, `workspace`, `relay`, `diag`, `stream`, `subscribe`, `privacy`, `validate`, `admin` | Power user features |

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
pal add ...         → pal pals add ...
pal remove ...      → pal pals remove ...
pal block ...       → pal pals block ...
pal connect ...     → pal network connect ...
pal disconnect ...  → pal network disconnect ...
```
