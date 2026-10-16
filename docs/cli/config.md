# Configuration Commands

## pal config list

Show all custom settings.

```bash
pal config list
```

## pal config get / set

```bash
pal config get logLevel
pal config set logLevel debug
pal config set downloadDir /path/to/downloads
pal config set bandwidth_cap 1024   # KB/s
```

## pal config reset

Reset to defaults.

```bash
pal config reset              # Reset all
pal config reset logLevel     # Reset specific key
```

## Key Reference

See [Configuration](/config/) for the full list of configuration keys.
