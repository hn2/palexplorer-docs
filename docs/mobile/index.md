# Mobile App

Palexplorer for iOS and Android brings the full P2P sharing experience to your phone.

**Current version**: v0.4.0 (beta)

## Installation

- **iOS**: Available on the App Store (search "Palexplorer")
- **Android**: Available on Google Play (search "Palexplorer")

The mobile app requires iOS 15+ or Android 10+.

## Features

The mobile app supports the core Palexplorer feature set:

| Feature | Description |
|---------|-------------|
| **Shares** | Browse, download, and manage your shares |
| **Share Explorer** | Browse any peer's shares interactively |
| **Transfers** | Monitor active and completed transfers |
| **Pals** | Manage your contacts and invitations |
| **Groups** | Create and manage sharing groups |
| **Chat** | E2E encrypted messaging with your pals |
| **Networks** | Join and manage private overlay networks |
| **Search** | Search across all accessible shares |
| **Notifications** | Real-time push notifications for share activity |
| **Audit** | View activity log |
| **Settings** | Configure identity, discovery, and appearance |
| **Stream** | Media streaming playback |

## Screens

- **Dashboard** — Overview of recent activity, online pals, and quick actions
- **Shares** — All your shares (shared by you and shared with you)
- **Share Explorer** — Interactive file browser for remote shares
- **Transfers** — Active and completed downloads
- **Pals** — Contacts list with online status
- **Groups** — Group management
- **Chat** — Messaging threads
- **Networks** — Private network management (Enterprise)
- **Search** — Full-text and file search
- **Notifications** — Push notification inbox
- **Settings** — Identity, recovery phrase, discovery, themes
- **Two-Factor Enroll** — 2FA setup flow
- **Pro** — Upgrade and subscription management

## Identity Sync

Your Ed25519 identity is portable across devices. To sign in on mobile:

1. On the desktop or CLI, run `pal whoami` to get your recovery phrase
2. On mobile, tap **Recover existing identity** at setup
3. Enter your 24-word phrase — your identity, pals, and shares are restored automatically

## Limitations

Compared to the desktop app, the mobile app currently does not support:

- CLI commands
- Extension management
- VFS (virtual drive mount)
- File manager context menu integration
- Advanced admin and compliance commands

These features are desktop/CLI only.

## Notifications

The mobile app supports push notifications for:

- New share invites
- Transfer completions
- Pal connection requests
- Chat messages
- Security alerts

Configure notification preferences in **Settings > Notifications**.
