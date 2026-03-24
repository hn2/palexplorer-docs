# SDK

The Palexplorer SDK (`palexplorer-sdk`) provides a JavaScript/TypeScript client for integrating with Palexplorer programmatically.

## Installation

```bash
npm install palexplorer-sdk
```

Zero dependencies. ES modules. Node.js 18+.

## Quick Start

```js
import { PalexplorerClient } from 'palexplorer-sdk';

const pal = new PalexplorerClient({
  baseUrl: 'http://localhost:7474',
  apiKey: 'your-api-key',        // For discovery server
  token: 'your-bearer-token',     // For local daemon
});

// List shares
const shares = await pal.shares.list();

// Download a file
await pal.transfers.download(magnetUri);

// Send a message
await pal.chat.send('alice', 'Hello!');

// Check who you are
const identity = await pal.identity.whoami();
```

## Sub-APIs

| API | Access | Description |
|-----|--------|-------------|
| [`pal.shares`](/sdk/shares) | `shares.*` | List, create, remove shares |
| [`pal.transfers`](/sdk/transfers) | `transfers.*` | Download, pause, resume, stats |
| [`pal.identity`](/sdk/identity) | `identity.*` | Whoami, resolve handles, devices |
| [`pal.chat`](/sdk/chat) | `chat.*` | Send/receive encrypted messages |
| [`pal.groups`](/sdk/groups) | `groups.*` | Create, manage groups |
| [`pal.presence`](/sdk/presence) | `presence.*` | Online status, heartbeats |
| [`pal.audit`](/sdk/audit) | `audit.*` | Audit log access |

## Authentication

See [Authentication](/sdk/authentication) for API key and token setup.

## Rate Limits

| Plan | Requests/min | API Keys |
|------|-------------|----------|
| Free | No access | 0 |
| Pro | 600 | 3 |
| API Pro | 600 | 5 |
| Enterprise | 2,400 | 50 |
