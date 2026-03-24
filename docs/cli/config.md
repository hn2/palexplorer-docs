# Configuration Commands

## pe config list

Show all custom settings.

```bash
pe config list
```

## pe config get / set

```bash
pe config get logLevel
pe config set logLevel debug
pe config set downloadDir /path/to/downloads
pe config set bandwidth_cap 1024   # KB/s
```

## pe config reset

Reset to defaults.

```bash
pe config reset              # Reset all
pe config reset logLevel     # Reset specific key
```

## Key Reference

See [Configuration](/config/) for the full list of configuration keys.
