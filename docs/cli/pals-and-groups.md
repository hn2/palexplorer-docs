# Pals & Groups Commands

## pe pal add

Add a pal.

```bash
pe pal add alice                           # By handle
pe pal add <public-key> --name "Alice"     # By public key
```

## pe pal list / rename / remove

```bash
pe pal list
pe pal rename <id> "Alice Smith"
pe pal remove <id>
```

## pe nearby

Discover peers on your local network via mDNS.

```bash
pe nearby
pe nearby --json    # JSON output
```

## pe group create / delete

```bash
pe group create "Team Alpha"
pe group delete <group-id>
```

## pe group add / remove

```bash
pe group add "Team Alpha" alice bob charlie
pe group remove "Team Alpha" bob
```

## pe group broadcast

Send a message to all group members.

```bash
pe group broadcast "Team Alpha" "Meeting at 3pm"
```
