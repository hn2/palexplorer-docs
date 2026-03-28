# Sync Commands

Two-way folder synchronization between devices.

## pal sync add

Create a sync pair.

```bash
pal sync add <pal> <local-dir>
```

## pal sync push / pull

```bash
pal sync push <pair-id>    # Push local changes to peer
pal sync pull <pair-id>    # Pull peer changes to local
```

## pal sync watch

Auto-sync on file changes.

```bash
pal sync watch <pair-id>
```

## pal sync diff

Show pending changes.

```bash
pal sync diff <pair-id>
```

## pal sync status

Show last sync time, conflicts, and pending changes.

```bash
pal sync status <pair-id>
```

## pal sync resolve

Resolve a conflict.

```bash
pal sync resolve <pair-id> <file> keep_local
pal sync resolve <pair-id> <file> keep_remote
pal sync resolve <pair-id> <file> keep_both
```

## pal sync list / history / remove

```bash
pal sync list                  # All sync pairs
pal sync history <pair-id>     # Sync history
pal sync remove <pair-id>      # Stop syncing (keeps files)
```
