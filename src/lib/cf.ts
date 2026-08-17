import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getCloudflareEnv(): Promise<CloudflareEnv | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env;
  } catch {
    return null;
  }
}

export async function getDb(): Promise<D1Database | null> {
  const env = await getCloudflareEnv();
  return env?.DB ?? null;
}

export async function getMediaBucket(): Promise<R2Bucket | null> {
  const env = await getCloudflareEnv();
  return env?.MEDIA ?? null;
}
