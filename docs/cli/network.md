# Network & Discovery Commands

## pe connect / disconnect

```bash
pe connect       # Connect to discovery network
pe disconnect    # Go offline
```

## pe status

Show connection status, identity, and transfer stats.

```bash
pe status
```

## pe server

Manage discovery servers.

```bash
pe server list                    # List configured servers
pe server add https://my-server   # Add custom server
pe server remove https://my-server
```

## pe network

Private network management (Enterprise).

```bash
pe network create "Acme Corp"
pe network list
pe network invite <id> alice
pe network join <invite-code>
```

## pe protocol

Protocol diagnostics.

```bash
pe protocol info    # PAL/1.0 version and features
```

## pe federation

Multi-server federation.

```bash
pe federation peer    # Federate with peer discovery server
```
