# Pals & Groups Commands

## pal pals add

Add a pal.

```bash
pal pals add alice                           # By handle
pal pals add <public-key> --name "Alice"     # By public key
```

## pal pals list / rename / remove

```bash
pal pals list
pal pals rename <id> "Alice Smith"
pal pals remove <id>
```

## pal nearby

Discover peers on your local network via mDNS.

```bash
pal nearby
pal nearby --json    # JSON output
```

## pal group create / delete

```bash
pal group create "Team Alpha"
pal group delete <group-id>
```

## pal group add / remove

```bash
pal group add "Team Alpha" alice bob charlie
pal group remove "Team Alpha" bob
```

## pal group broadcast

Send a message to all group members.

```bash
pal group broadcast "Team Alpha" "Meeting at 3pm"
```
