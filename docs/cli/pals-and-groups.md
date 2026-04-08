# Pals & Groups Commands

## pal pal add

Add a pal by handle, invite link, or raw public key.

```bash
pal pal add @alice                       # By @handle (requires discovery)
pal pal add pal://...                    # From invite link
pal pal add <public-key> "Alice"         # By raw public key with nickname
```

## pal pal list / info / remove

```bash
pal pal list                             # List all pals with online status
pal pal info <pal>                       # Show detailed profile for a pal
pal pal remove <pal>                     # Remove a pal (rotates affected share keys)
```

## pal pal name / unname

Set or clear a pal's nickname.

```bash
pal pal name <pal> "Alice Smith"         # Set nickname
pal pal unname <pal>                     # Remove nickname (shows as key prefix)
```

## pal nearby

Discover peers on your local network via mDNS.

```bash
pal nearby
pal nearby --json    # JSON output
```

## pal invite

Generate a magic invite link so others can add you as a pal.

```bash
pal invite
```

## pal group create / delete

```bash
pal group create "Team Alpha"
pal group create "Public Team" --public   # Public group (visible on discovery)
pal group delete <group>
```

## pal group add / remove

```bash
pal group add "Team Alpha" @alice
pal group remove "Team Alpha" @alice
```

## pal group list / edit / announce

```bash
pal group list                                      # List all groups
pal group edit "Team Alpha" --desc "Engineering"    # Edit description
pal group announce                                  # Announce public groups to discovery
```

## pal group broadcast

Send a message to all group members.

```bash
pal group broadcast "Team Alpha" "Meeting at 3pm"
```
