import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ACCOUNT_ID = "4df0efbadee174805b849a9775ea5acc";
const ZONE_NAME = "edgeland.org";

function wranglerConfigPath(): string {
  const candidates = [
    path.join(process.env.APPDATA ?? "", "xdg.config", ".wrangler", "config", "default.toml"),
    path.join(os.homedir(), ".config", "wrangler", "config", "default.toml"),
    path.join(os.homedir(), ".wrangler", "config", "default.toml"),
  ];
  const found = candidates.find((file) => fs.existsSync(file));
  if (!found) throw new Error("Wrangler OAuth config not found. Run npx wrangler login.");
  return found;
}

function readOauthToken(): string {
  const raw = fs.readFileSync(wranglerConfigPath(), "utf8");
  const match = raw.match(/oauth_token\s*=\s*"([^"]+)"/);
  if (!match) throw new Error("No oauth_token in Wrangler config.");
  return match[1];
}

async function cf(pathname: string, init?: RequestInit) {
  const token = readOauthToken();
  const response = await fetch(`https://api.cloudflare.com/client/v4${pathname}`, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const body = (await response.json()) as {
    success: boolean;
    errors?: { code?: number; message: string }[];
    result?: unknown;
  };
  if (!body.success) {
    const message = body.errors?.map((error) => error.message).join("; ") || response.statusText;
    throw new Error(`Cloudflare API ${pathname}: ${message}`);
  }
  return body.result;
}

type Zone = {
  id: string;
  name: string;
  status: string;
  name_servers?: string[];
};

async function getZone(): Promise<Zone | undefined> {
  const result = (await cf(
    `/zones?name=${encodeURIComponent(ZONE_NAME)}&account.id=${ACCOUNT_ID}`,
  )) as Zone[];
  return result[0];
}

async function createZone(): Promise<Zone> {
  return (await cf("/zones", {
    method: "POST",
    body: JSON.stringify({
      name: ZONE_NAME,
      account: { id: ACCOUNT_ID },
      type: "full",
      jump_start: false,
    }),
  })) as Zone;
}

async function main() {
  const existing = await getZone();
  const zone = existing ?? (await createZone());
  console.log(
    JSON.stringify(
      {
        id: zone.id,
        name: zone.name,
        status: zone.status,
        created: !existing,
        name_servers: zone.name_servers ?? [],
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
