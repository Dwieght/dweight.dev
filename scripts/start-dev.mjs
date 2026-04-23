import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { cleanNextDist } from "./dev-utils.mjs";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
cleanNextDist(path.resolve(process.cwd(), ".next"));
const child = spawn(process.execPath, [nextBin, "dev", ...process.argv.slice(2)], {
  cwd: process.cwd(),
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
