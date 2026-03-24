# Authentication

The SDK supports two authentication methods.

## API Key

For discovery server operations. Passed as `X-API-Key` header.

```js
const pal = new PalexplorerClient({
  baseUrl: 'https://discovery.palexplorer.com',
  apiKey: 'your-api-key',
});
```

Generate an API key:

```bash
pe api-keys generate
```

## Bearer Token

For local daemon operations. Passed as `Authorization: Bearer <token>` header.

```js
const pal = new PalexplorerClient({
  baseUrl: 'http://localhost:7474',
  token: 'your-bearer-token',
});
```

## Combined

Use both for full feature access:

```js
const pal = new PalexplorerClient({
  baseUrl: 'http://localhost:7474',
  apiKey: 'your-api-key',
  token: 'your-bearer-token',
});
```

## Discovery Client

For lightweight discovery-server-only operations:

```js
import { DiscoveryClient } from 'palexplorer-sdk';

const discovery = new DiscoveryClient({
  baseUrl: 'https://discovery.palexplorer.com',
  apiKey: 'your-api-key',
});

const resolved = await discovery.resolve('alice');
```
