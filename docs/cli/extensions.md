# Extension Commands

## pe ext list

Show all installed extensions.

```bash
pe ext list
```

## pe ext create

Scaffold a new extension.

```bash
pe ext create my-extension
```

Creates `extension.json`, `index.js`, tests, and docs.

## pe ext enable / disable

```bash
pe ext enable my-extension
pe ext disable my-extension
```

## pe ext install / remove

```bash
pe ext install ./path/to/extension    # From local path
pe ext install https://github.com/... # From Git URL
pe ext install-remote my-extension    # From Marketplace
pe ext remove my-extension
```

## pe ext info

Show extension details, permissions, and hooks.

```bash
pe ext info my-extension
```

## pe ext config

Get or set extension configuration.

```bash
pe ext config my-extension                    # Show all config
pe ext config my-extension webhookUrl         # Get value
pe ext config my-extension webhookUrl "https://..."  # Set value
```

## pe ext audit

Security audit all installed extensions.

```bash
pe ext audit
```

## pe ext sign

Sign extension with your Ed25519 identity.

```bash
pe ext sign ./my-extension
```

## pe ext publish

Publish to the Palexplorer Marketplace.

```bash
pe ext publish ./my-extension
```

## pe ext search

Search the Marketplace.

```bash
pe ext search "analytics"
```

## pe ext buy / earnings / my-extensions

```bash
pe ext buy premium-extension     # Purchase paid extension
pe ext earnings                  # Show developer earnings
pe ext my-extensions             # List your published extensions
```
