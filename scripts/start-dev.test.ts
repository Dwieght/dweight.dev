/* @vitest-environment node */

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs) {
    rmSync(dir, { recursive: true, force: true });
  }

  tempDirs.length = 0;
});

describe("dev startup wrapper", () => {
  it("routes pnpm dev through a repo-local startup script", () => {
    const packageJsonPath = path.resolve(process.cwd(), "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
    const wrapperPath = path.resolve(process.cwd(), "scripts/start-dev.mjs");

    expect(packageJson.scripts.dev).toBe("node scripts/start-dev.mjs");
    expect(existsSync(wrapperPath)).toBe(true);
  });

  it("removes an existing .next directory before dev starts", async () => {
    const moduleUrl = new URL("./dev-utils.mjs", import.meta.url);
    const devUtils = await import(moduleUrl.href).catch(() => null);

    expect(devUtils?.cleanNextDist).toBeTypeOf("function");

    if (!devUtils?.cleanNextDist) {
      return;
    }

    const root = path.join(
      tmpdir(),
      `dweight-next-clean-${Date.now()}-${Math.random().toString(16).slice(2)}`
    );
    const nextDir = path.join(root, ".next");

    tempDirs.push(root);

    mkdirSync(path.join(nextDir, "server"), { recursive: true });
    writeFileSync(path.join(nextDir, "server", "webpack-runtime.js"), "stale");

    devUtils.cleanNextDist(nextDir);

    expect(existsSync(nextDir)).toBe(false);
  });
});
