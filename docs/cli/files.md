# File Commands

## pal file ls

List files in a directory.

```bash
pal file ls /path/to/dir
pal file ls /path -r           # Recursive
```

## pal file tree

Show directory tree.

```bash
pal file tree /path
```

## pal file info

Show file metadata (size, hash, mtime, permissions).

```bash
pal file info /path/to/file
```

## pal file search

Search files by pattern.

```bash
pal file search /path --query "*.pdf"
```

## pal file copy / move

```bash
pal file copy /src /dst
pal file move /src /dst
```

## pal file mkdir

Create directory (recursive).

```bash
pal file mkdir /path/to/new/dir
```

## pal file delete

Delete files.

```bash
pal file delete /path/to/file
```

## pal file open

Open in default application (desktop only).

```bash
pal file open /path/to/file
```

## pal file audit

View file access log for a share.

```bash
pal file audit <share-id>
```
