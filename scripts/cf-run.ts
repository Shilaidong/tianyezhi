import { runWithProxyFallback } from "./cf-net";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("usage: tsx scripts/cf-run.ts <command> [args...]");
  process.exit(1);
}

const command = args[0];
const rest = args.slice(1);
process.exit(runWithProxyFallback(command, rest));
