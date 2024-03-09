/**
 * Resolve Package manager and its command prefix from environment's user agent
 * @returns {{packageManager: string, commandPrefix: string}}
 */
export default function resolvePackageManager() {
  const userAgent = process.env.npm_config_user_agent ?? "";

  const packageManager = /yarn/.test(userAgent)
    ? "yarn"
    : /pnpm/.test(userAgent)
    ? "pnpm"
    : "npm";
  
  const commandPrefix = /yarn/.test(userAgent)
    ? "yarn"
    : /pnpm/.test(userAgent)
    ? "pnpm"
    : "npm run";

  return { packageManager, commandPrefix };
}