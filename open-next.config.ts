import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Dummy cache: pages are force-dynamic and read D1 at request time.
// Avoids Durable Objects (Workers Paid) for ISR.
export default defineCloudflareConfig();
