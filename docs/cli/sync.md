# Sync Commands

Two-way folder synchronization between devices.

## pe sync add

Create a sync pair.

```bash
pe sync add <pal> <local-dir>
```

## pe sync push / pull

```bash
pe sync push <pair-id>    # Push local changes to peer
pe sync pull <pair-id>    # Pull peer changes to local
```

## pe sync watch

Auto-sync on file changes.

```bash
pe sync watch <pair-id>
```

## pe sync diff

Show pending changes.

```bash
pe sync diff <pair-id>
```

## pe sync status

Show last sync time, conflicts, and pending changes.

```bash
pe sync status <pair-id>
```

## pe sync resolve

Resolve a conflict.

```bash
pe sync resolve <pair-id> <file> keep_local
pe sync resolve <pair-id> <file> keep_remote
pe sync resolve <pair-id> <file> keep_both
```

## pe sync list / history / remove

```bash
pe sync list                  # All sync pairs
pe sync history <pair-id>     # Sync history
pe sync remove <pair-id>      # Stop syncing (keeps files)
```
