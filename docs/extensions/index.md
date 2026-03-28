# Extensions

Palexplorer's core is intentionally minimal — identity, shares, encryption, and P2P transfers. Everything else is an extension.

## Built-In Extensions

### Free

| Extension | Description |
|-----------|-------------|
| `@palexplorer/sync` | Two-way folder synchronization |
| `@palexplorer/chat` | E2E encrypted P2P messaging |
| `@palexplorer/share-links` | Shareable download links |
| `@palexplorer/groups` | Group management and batch sharing |
| `@palexplorer/discovery` | Discovery servers, @handles, online presence |
| `@palexplorer/auth-email` | Email verification and recovery |
| `@palexplorer/auth-oauth` | Google, GitHub, Microsoft login |
| `@palexplorer/audit` | Activity log and audit trail |
| `@palexplorer/email-notifications` | Email notifications (SMTP, SendGrid, etc.) |
| `@palexplorer/user-mgmt` | Multi-user roles and access control |

### Pro ($2.99/mo)

| Extension | Description |
|-----------|-------------|
| `@palexplorer/vfs` | Virtual drive via WebDAV |
| `@palexplorer/explorer-integration` | File manager context menu |
| `@palexplorer/analytics` | Opt-in usage analytics (PostHog) |
| `@palexplorer/transfer-analytics` | Transfer statistics and graphs |
| `@palexplorer/media-streaming` | Audio/video streaming |

### Enterprise ($9.99/seat/mo)

| Extension | Description |
|-----------|-------------|
| `@palexplorer/networks` | Private overlay networks |
| `@palexplorer/auth-sso` | SAML/OIDC SSO (Okta, Azure AD) |
| `@palexplorer/turn-relay` | TURN relay for NAT traversal |

## Enable an Extension

```bash
pal ext enable @palexplorer/sync
```

Or go to **Settings > Extensions** in the desktop app.

## Build Your Own

Create custom extensions with the Extension API:

```bash
pal ext create my-extension
```

See [Build Your Own Extension](/extensions/build-your-own) for the full guide.

## Extension Marketplace

Browse, install, and publish extensions:

```bash
pal ext search "webhook"
pal ext install-remote webhook-notifier
pal ext publish ./my-extension
```
