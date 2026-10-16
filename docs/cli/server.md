# Server & Services Commands

## pal serve

Start the WebTorrent seeder (keeps shares available for download).

```bash
pal serve                      # Basic seeder
pal serve --web                # With web dashboard + REST API
pal serve --web --port 7474    # Custom port
```

## pal web

Launch the web dashboard.

```bash
pal web
```

REST API + WebSocket server with bearer token auth.

## pal vfs

Mount shares as a virtual drive via WebDAV.

```bash
pal vfs
```

- **Windows**: Mounts as `P:` drive
- **macOS**: `/Volumes/Pal`
- **Linux**: `/mnt/pal`

Default server: `localhost:8765`

## pal explorer

Open a share in the native file manager.

```bash
pal explorer <share-id>
```

## pal stream

Media streaming.

```bash
pal stream broadcast <file>    # Start streaming
pal stream join <handle>       # Join a stream
```

## pal schedule

Scheduled tasks.

```bash
pal schedule add "0 */6 * * *" "pal sync push all"
```

## pal update

```bash
pal update check    # Check for app updates
```
