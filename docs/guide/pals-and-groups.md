# Pals & Groups

## Pals

Pals are your contacts — identified by their Ed25519 public key.

### Add a Pal

```bash
# By handle (requires Discovery extension)
pe pal add alice

# By public key
pe pal add <64-char-hex-public-key> --name "Alice"

# Discover on LAN
pe nearby
```

### Manage Pals

```bash
pe pal list
pe pal rename <id> "Alice Smith"
pe pal remove <id>
```

## Groups

Groups let you share with multiple pals at once.

```bash
# Create a group
pe group create "Team Alpha"

# Add members
pe group add "Team Alpha" alice bob charlie

# Remove a member
pe group remove "Team Alpha" bob

# Broadcast message to all members
pe group broadcast "Team Alpha" "Meeting at 3pm"

# Delete group
pe group delete "Team Alpha"
```

### Sharing with Groups

```bash
pe share ./docs --name "Team Docs" --with-group "Team Alpha"
```

All group members receive access. New members added later get access automatically.
