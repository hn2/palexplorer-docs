# Testing Extensions

The `pal ext create` scaffold includes a test template using Node.js built-in test runner.

## Writing Tests

```js
// test/my-extension.test.js
import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { activate, deactivate } from '../index.js';

describe('my-extension', () => {
  function createMockContext() {
    const hooks = [];
    return {
      logger: {
        info: mock.fn(),
        warn: mock.fn(),
        error: mock.fn(),
      },
      config: {
        get: mock.fn((key) => {
          const defaults = { webhookUrl: 'https://hooks.slack.com/test' };
          return defaults[key];
        }),
        set: mock.fn(),
        getAll: mock.fn(() => ({})),
      },
      store: {
        get: mock.fn(() => 0),
        set: mock.fn(),
        delete: mock.fn(),
      },
      hooks: {
        on: mock.fn((event, handler) => hooks.push({ event, handler })),
      },
      app: {
        version: '0.5.0',
        platform: 'linux',
        mode: 'cli',
        dataDir: '/tmp/test',
        appRoot: '/tmp/app',
      },
      _hooks: hooks,
    };
  }

  it('registers hooks on activate', () => {
    const ctx = createMockContext();
    activate(ctx);

    assert.ok(ctx.hooks.on.mock.calls.length > 0);
    assert.ok(ctx._hooks.some(h => h.event === 'after:share:create'));
  });

  it('handles share create event', async () => {
    const ctx = createMockContext();
    activate(ctx);

    const handler = ctx._hooks.find(
      h => h.event === 'after:share:create'
    )?.handler;

    assert.ok(handler);
    await handler({ shareId: 'test-123', name: 'Test Share' });
    assert.ok(ctx.logger.info.mock.calls.length > 0);
  });

  it('increments share count in store', async () => {
    const ctx = createMockContext();
    activate(ctx);

    const handler = ctx._hooks.find(
      h => h.event === 'after:share:create'
    )?.handler;

    await handler({ shareId: 'test-123', name: 'Test' });
    assert.ok(ctx.store.set.mock.calls.length > 0);
  });
});
```

## Running Tests

```bash
node --test test/
```

## Security Audit

Run a security audit before publishing:

```bash
pal ext audit
```

This scans all installed extensions for:
- Blocked module imports
- Dangerous patterns (eval, dynamic imports)
- Prototype pollution attempts
- Unsigned or tampered files
