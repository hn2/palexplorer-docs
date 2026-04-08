# Extensions

Palexplorer's core is intentionally minimal — identity, shares, encryption, and P2P transfers. Everything else is an extension.

## Built-In Extensions

### Free

All free extensions are included with any plan (including Free).

| Extension | Description | Status |
|-----------|-------------|--------|
| `@palexplorer/analytics` | Anonymous usage analytics via PostHog — opt-in, no PII, privacy-safe | Available |
| `@palexplorer/auth-email` | Link your email to your Palexplorer handle for verification and recovery | Available |
| `@palexplorer/auth-oauth` | OAuth 2.0 social login with Google, GitHub, and Microsoft via PKCE flow | Available |
| `@palexplorer/discovery` | Discover peers via DHT — adds @handles, online presence, and server-assisted peer finding | Available |
| `@palexplorer/email-notifications` | Email notifications for share invites, transfers, peer activity, and security alerts | Available |
| `@palexplorer/explorer-integration` | Add "Share with Pal" to your file manager context menu (Explorer, Finder, Nautilus) | Available |
| `@palexplorer/vfs` | Mount Palexplorer shares as a virtual drive (WebDAV) | Available |

### Pro

Requires an active Pro subscription.

| Extension | Description | Status |
|-----------|-------------|--------|
| `@palexplorer/backup-cloud` | Encrypted cloud backup to S3, Azure Blob, GCS, or Backblaze B2 with scheduled auto-backup | Coming Soon |
| `@palexplorer/federation-registry` | Federated discovery server registry with cross-server handle resolution and trust scoring | Available |
| `@palexplorer/media-streaming` | Stream media files (video/audio) from local or remote shares with watch party support | Available |
| `@palexplorer/relay-server` | Self-hosted STUN/TURN relay server for NAT traversal with time-limited HMAC credentials | Available |
| `@palexplorer/reporting-dashboard` | Usage reports and analytics dashboard with storage trends, bandwidth stats, and PDF/CSV exports | Available |
| `@palexplorer/teams` | Work-oriented team management with custom roles, methodology governance, and contractor support | Available |
| `@palexplorer/transfer-analytics` | Transfer statistics, usage reports, and history analytics | Available |
| `@palexplorer/webhook-integrations` | Outgoing webhooks to Slack, Discord, Teams, and custom URLs with HMAC signing | Available |

### Enterprise

Requires an active Enterprise subscription. Contact [hello@palexplorer.com](mailto:hello@palexplorer.com) for pricing.

#### Core Enterprise

| Extension | Description | Status |
|-----------|-------------|--------|
| `@palexplorer/advanced-audit` | Advanced audit trails: tamper-proof logging, real-time alerts, forensic export, SIEM integration | Available |
| `@palexplorer/content-scanner` | DLP content scanning with sensitive data detection, file type restrictions, auto-classification, and quarantine | Available |
| `@palexplorer/dev-teams` | Multi-agent SDLC pipelines — orchestrate AI agents through groom→implement→review→QA→ship workflow | Available |
| `@palexplorer/enterprise-rbac` | Granular role-based access control with custom roles and per-file permissions | Available |
| `@palexplorer/federation-bridge` | Cross-network bridge for routing shares and messages between independent Palexplorer networks | Available |
| `@palexplorer/org-policy` | Central admin policy engine — enforce org-wide rules across auth, sharing, files, network, and settings | Available |
| `@palexplorer/resource-governor` | P2P compute mesh — pool CPU, GPU, memory, storage across team machines with budget tracking | Available |
| `@palexplorer/scim-provisioning` | SCIM 2.0 user/group provisioning: sync users from Okta, Azure AD, OneLogin, JumpCloud | Available |
| `@palexplorer/sso-connector` | SAML 2.0 and OIDC single sign-on integration for enterprise identity providers | Available |

#### Compliance Bundles

| Extension | Regulation | Status |
|-----------|------------|--------|
| `@palexplorer/compliance-ccpa` | CCPA/CPRA — consumer rights, personal information detection, data processing records | Available |
| `@palexplorer/compliance-cmmc` | CMMC — CUI handling, NIST SP 800-171 mapping, maturity level assessment | Available |
| `@palexplorer/compliance-dora` | DORA — ICT risk management, incident reporting, digital resilience testing | Available |
| `@palexplorer/compliance-fedramp` | FedRAMP/NIST 800-53 — control mapping, FIPS 140-2 validation, continuous monitoring | Available |
| `@palexplorer/compliance-ferpa` | FERPA — student record detection, directory information rules, parental consent tracking | Available |
| `@palexplorer/compliance-financial` | SEC/FINRA — record retention, WORM storage, communication archiving, legal hold | Available |
| `@palexplorer/compliance-gdpr` | GDPR — consent management, data subject rights (export/erasure), DPA enforcement | Available |
| `@palexplorer/compliance-hipaa` | HIPAA — access logging, PHI detection, BAA enforcement, data retention policies | Available |
| `@palexplorer/compliance-iso27001` | ISO/IEC 27001 — ISMS control mapping, risk assessment, non-conformity tracking | Available |
| `@palexplorer/compliance-itar` | ITAR/EAR — controlled content marking, country-based transfer restrictions | Available |
| `@palexplorer/compliance-pci` | PCI DSS — card data detection, cardholder data environment enforcement | Available |
| `@palexplorer/compliance-soc2` | SOC 2 Type II — continuous monitoring, access controls, change management, incident tracking | Available |

## Enable an Extension

```bash
pal ext enable @palexplorer/discovery
```

Or go to **Settings > Extensions** in the desktop app.

## Manage Extensions

```bash
pal ext list                             # List all installed extensions
pal ext info @palexplorer/teams          # Show extension details
pal ext enable @palexplorer/analytics    # Enable an extension
pal ext disable @palexplorer/analytics   # Disable an extension
pal ext config @palexplorer/analytics    # View/edit extension config
```

## Build Your Own

Create custom extensions with the Extension API:

```bash
pal ext create my-extension
```

See [Build Your Own Extension](/extensions/build-your-own) for the full guide.
