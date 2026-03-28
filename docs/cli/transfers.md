# Transfer Commands

## pal download

Download by magnet link or share link.

```bash
pal download <magnet>
pal download <magnet1> <magnet2>    # Multiple downloads
```

Auto-decrypts if the encryption key is provided in the magnet.

## pal transfers

List and manage transfers.

```bash
pal transfers              # Active transfers
pal transfers --active     # Active only
pal transfers --history    # Completed transfers
pal transfers stats        # Aggregated statistics
```

## pal transfers pause / resume

```bash
pal transfers pause <magnet>
pal transfers resume <magnet>
```

## pal cancel

Cancel an active transfer.

```bash
pal cancel <magnet>
```

## pal serve

Start seeding all your shares.

```bash
pal serve                      # Basic seeder
pal serve --web                # With web dashboard
pal serve --web --port 7474    # Custom port
```
