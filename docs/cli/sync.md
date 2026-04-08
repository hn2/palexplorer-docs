# Sync Commands

Two-way folder synchronization between devices.

## pal sync start

Create a bi-directional sync pair (default).

```bash
pal sync start <path> <pal>         # Bi-directional sync
```

## pal sync push / pull

One-way sync.

```bash
pal sync push <path> <pal>          # Push local changes to peer
pal sync pull <path> <pal>          # Pull peer changes to local
```

## pal sync watch

Auto-sync on file changes.

```bash
pal sync watch <path> <pal>
```

## pal sync schedule

Background sync at intervals.

```bash
pal sync schedule <path> <pal>
```

## pal sync diff

Compare local and remote folders.

```bash
pal sync diff <localPath> <remotePath>
```

## pal sync status

Show sync status and changes since last sync.

```bash
pal sync status [path]
```

## pal sync list / history / remove

```bash
pal sync list                       # All sync pairs
pal sync history [pairId]           # Sync history
pal sync remove <id>                # Remove sync pair (keeps files)
```

## pal sync profile

Manage reusable sync flag profiles.

```bash
pal sync profile
```
