import { spawnSync } from "node:child_process";

const PROXY_KEYS = [
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "http_proxy",
  "https_proxy",
  "ALL_PROXY",
  "all_proxy",
];

function hasProxy(): boolean {
  return PROXY_KEYS.some((key) => Boolean(process.env[key]));
}

function withoutProxyEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  for (const key of PROXY_KEYS) delete env[key];
  return env;
}

function looksLikeProxyFailure(result: ReturnType<typeof spawnSync>): boolean {
  const text = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.toLowerCase();
  return /fetch failed|timed out|timeout|connectivity issue|econnreset|socket hang up|could not connect/.test(
    text,
  );
}

function runOnce(
  command: string,
  args: string[],
  env: NodeJS.ProcessEnv,
): ReturnType<typeof spawnSync> {
  const result = spawnSync(command, args, {
    shell: true,
    env,
    encoding: "utf8",
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  return result;
}

export function runWithProxyFallback(
  command: string,
  args: string[],
  extraEnv?: Record<string, string>,
): number {
  const first = runOnce(command, args, { ...process.env, ...extraEnv });
  if (first.status === 0) return 0;
  if (!hasProxy() || !looksLikeProxyFailure(first)) {
    return first.status ?? 1;
  }
  console.warn("\nProxy request failed. Retrying without HTTP(S)_PROXY...\n");
  const second = runOnce(command, args, { ...withoutProxyEnv(), ...extraEnv });
  return second.status ?? 1;
}
