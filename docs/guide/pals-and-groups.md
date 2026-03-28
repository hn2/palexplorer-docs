# Pals & Groups

## Pals

Pals are your contacts — identified by their Ed25519 public key.

### Add a Pal

```bash
# By handle (requires Discovery extension)
pal pal add alice

# By public key
pal pal add <64-char-hex-public-key> --name "Alice"

# Discover on LAN
pal nearby
```

### Manage Pals

```bash
pal pal list
pal pal rename <id> "Alice Smith"
pal pal remove <id>
```

## Groups

Groups let you share with multiple pals at once.

```bash
# Create a group
pal group create "Team Alpha"

# Add members
pal group add "Team Alpha" alice bob charlie

# Remove a member
pal group remove "Team Alpha" bob

# Broadcast message to all members
pal group broadcast "Team Alpha" "Meeting at 3pm"

# Delete group
pal group delete "Team Alpha"
```

### Sharing with Groups

```bash
pal share ./docs --name "Team Docs" --with-group "Team Alpha"
```

All group members receive access. New members added later get access automatically.
