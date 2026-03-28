# Extension Commands

## pal ext list

Show all installed extensions.

```bash
pal ext list
```

## pal ext create

Scaffold a new extension.

```bash
pal ext create my-extension
```

Creates `extension.json`, `index.js`, tests, and docs.

## pal ext enable / disable

```bash
pal ext enable my-extension
pal ext disable my-extension
```

## pal ext install / remove

```bash
pal ext install ./path/to/extension    # From local path
pal ext install https://github.com/... # From Git URL
pal ext install-remote my-extension    # From Marketplace
pal ext remove my-extension
```

## pal ext info

Show extension details, permissions, and hooks.

```bash
pal ext info my-extension
```

## pal ext config

Get or set extension configuration.

```bash
pal ext config my-extension                    # Show all config
pal ext config my-extension webhookUrl         # Get value
pal ext config my-extension webhookUrl "https://..."  # Set value
```

## pal ext audit

Security audit all installed extensions.

```bash
pal ext audit
```

## pal ext sign

Sign extension with your Ed25519 identity.

```bash
pal ext sign ./my-extension
```

## pal ext publish

Publish to the Palexplorer Marketplace.

```bash
pal ext publish ./my-extension
```

## pal ext search

Search the Marketplace.

```bash
pal ext search "analytics"
```

## pal ext buy / earnings / my-extensions

```bash
pal ext buy premium-extension     # Purchase paid extension
pal ext earnings                  # Show developer earnings
pal ext my-extensions             # List your published extensions
```
