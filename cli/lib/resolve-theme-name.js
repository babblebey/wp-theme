import color from "picocolors";
import { text, isCancel, cancel } from "@clack/prompts";
import { isValidThemeName, toValidThemeName } from "../utils/theme-name.js";

/**
 * Resolve Theme Name from argument
 * @param {string} nameFromArgv 
 * @returns {Promise<string>}
 */
export default async function resolveThemeName(nameFromArgv) {
  let themeName = nameFromArgv;

  if(!themeName) {
    themeName = await text({
      message: "What is the name of your theme?",
      defaultValue: "cwpt",
      placeholder: "cwpt"
    });

    if (isCancel(themeName)) {
      cancel(color.red("Operation cancelled."));
      process.exit(0);
    }
  }

  if (!isValidThemeName(themeName)) {
    themeName = toValidThemeName(themeName);
  }

  return themeName;
}