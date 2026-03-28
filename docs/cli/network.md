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
pal network create "Acme Corp"
pal network list
pal network invite <id> alice
pal network join <invite-code>
```

## pal protocol

Protocol diagnostics.

```bash
pal protocol info    # PAL/1.0 version and features
```

## pal federation

Multi-server federation.

```bash
pal federation peer    # Federate with peer discovery server
```
