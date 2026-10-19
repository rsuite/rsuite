import { client } from '@vitest/browser/client';

// Observe Vitest's existing orchestrator connection without replacing or reopening it.
client.ws.addEventListener('close', event => {
  console.info(
    '[Browser RPC close]',
    JSON.stringify({ code: event.code, wasClean: event.wasClean })
  );
});
