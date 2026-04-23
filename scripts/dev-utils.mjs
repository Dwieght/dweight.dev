import { existsSync, rmSync } from "node:fs";

export function cleanNextDist(distDir) {
  if (!existsSync(distDir)) {
    return;
  }

  rmSync(distDir, { recursive: true, force: true });
}
