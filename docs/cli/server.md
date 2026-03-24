# Server & Services Commands

## pe serve

Start the WebTorrent seeder (keeps shares available for download).

```bash
pe serve                      # Basic seeder
pe serve --web                # With web dashboard + REST API
pe serve --web --port 7474    # Custom port
```

## pe web

Launch the web dashboard.

```bash
pe web
```

REST API + WebSocket server with bearer token auth.

## pe vfs

Mount shares as a virtual drive via WebDAV.

```bash
pe vfs
```

- **Windows**: Mounts as `P:` drive
- **macOS**: `/Volumes/Pal`
- **Linux**: `/mnt/pal`

Default server: `localhost:8765`

## pe explorer

Open a share in the native file manager.

```bash
pe explorer <share-id>
```

## pe stream

Media streaming.

```bash
pe stream broadcast <file>    # Start streaming
pe stream join <handle>       # Join a stream
```

## pe schedule

Scheduled tasks.

```bash
pe schedule add "0 */6 * * *" "pe sync push all"
```

## pe update

```bash
pe update check    # Check for app updates
```
