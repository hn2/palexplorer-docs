# Transfer Commands

## pe download

Download by magnet link or share link.

```bash
pe download <magnet>
pe download <magnet1> <magnet2>    # Multiple downloads
```

Auto-decrypts if the encryption key is provided in the magnet.

## pe transfers

List and manage transfers.

```bash
pe transfers              # Active transfers
pe transfers --active     # Active only
pe transfers --history    # Completed transfers
pe transfers stats        # Aggregated statistics
```

## pe transfers pause / resume

```bash
pe transfers pause <magnet>
pe transfers resume <magnet>
```

## pe cancel

Cancel an active transfer.

```bash
pe cancel <magnet>
```

## pe serve

Start seeding all your shares.

```bash
pe serve                      # Basic seeder
pe serve --web                # With web dashboard
pe serve --web --port 7474    # Custom port
```
