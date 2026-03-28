# Folder Sync

Two-way folder synchronization between devices using manifest-based delta sync.

## Setup a Sync Pair

```bash
pal sync add alice ./shared-folder
```

## Push & Pull

```bash
# Push local changes to peer
pal sync push <pair-id>

# Pull peer changes to local
pal sync pull <pair-id>

# Show pending changes
pal sync diff <pair-id>

# Check sync status
pal sync status <pair-id>
```

## Auto-Sync (Watch Mode)

```bash
pal sync watch <pair-id>
```

Watches for file changes and syncs automatically.

## Conflict Resolution

When both sides modify the same file:

```bash
pal sync resolve <pair-id> <file> keep_local
pal sync resolve <pair-id> <file> keep_remote
pal sync resolve <pair-id> <file> keep_both
```

## How It Works

### 3-Way Diff Algorithm

```
Local Manifest  (current state on Device A)
Remote Manifest (current state on Device B)
Base Manifest   (last known common state)

3-way merge:
  Added locally only    → push to remote
  Added remotely only   → pull to local
  Deleted locally only  → delete remotely
  Deleted remotely only → delete locally
  Modified both         → CONFLICT
```

### Manifest Entry

Each file is tracked as:

```json
{
  "relativePath": "photos/img001.jpg",
  "size": 4194304,
  "hash": "<sha256>",
  "mtime": 1710000000000
}
```

### Block-Level Delta Sync (Pro)

Only transfer changed blocks (4KB each) instead of full files. Reduces bandwidth for large files with small modifications.

## Manage Sync Pairs

```bash
pal sync list
pal sync history <pair-id>
pal sync remove <pair-id>
```
