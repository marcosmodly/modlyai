import { writeFileSync } from "node:fs";
import { join } from "node:path";

// @vercel/* packages ship tsconfig.json with "extends": "../../tsconfig.json"
// (valid in their monorepo, broken once installed under node_modules/@vercel/*).
const bridgePath = join(process.cwd(), "node_modules", "tsconfig.json");
const bridgeConfig = {
  extends: "../tsconfig.json",
};

writeFileSync(bridgePath, `${JSON.stringify(bridgeConfig, null, 2)}\n`);
