# File Commands

## pe file ls

List files in a directory.

```bash
pe file ls /path/to/dir
pe file ls /path -r           # Recursive
```

## pe file tree

Show directory tree.

```bash
pe file tree /path
```

## pe file info

Show file metadata (size, hash, mtime, permissions).

```bash
pe file info /path/to/file
```

## pe file search

Search files by pattern.

```bash
pe file search /path --query "*.pdf"
```

## pe file copy / move

```bash
pe file copy /src /dst
pe file move /src /dst
```

## pe file mkdir

Create directory (recursive).

```bash
pe file mkdir /path/to/new/dir
```

## pe file delete

Delete files.

```bash
pe file delete /path/to/file
```

## pe file open

Open in default application (desktop only).

```bash
pe file open /path/to/file
```

## pe file audit

View file access log for a share.

```bash
pe file audit <share-id>
```
