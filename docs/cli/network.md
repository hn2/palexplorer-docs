# Network & Discovery Commands

## pal connect / disconnect

```bash
pal connect       # Connect to discovery network
pal disconnect    # Go offline
```

## pal status

Show connection status, identity, and transfer stats.

```bash
pal status
```

## pal server

Manage discovery servers.

```bash
pal server list                    # List configured servers
pal server add https://my-server   # Add custom server
pal server remove https://my-server
```

## pal network

Private network management (Enterprise).

```bash
pal network create "Acme Corp"     # Create a network
pal network list                   # List your networks
pal network info <id>              # Show network details
pal network invite <id>            # Generate invite link
pal network join <code>            # Join via invite code
pal network members <id>           # List members
pal network groups <id>            # List groups in network
pal network create-group <id> <name>  # Create a group in network
pal network delete <id>            # Delete a network
```

## pal protocol

Protocol diagnostics.

```bash
pal protocol info    # PAL/2.0 version, capabilities, and limits
```

## pal federation

Multi-server federation.

```bash
pal federation peer    # Federate with peer discovery server
```
