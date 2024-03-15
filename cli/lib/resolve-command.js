import { select, cancel, isCancel } from "@clack/prompts";
import { SUPPORTED_COMMANDS } from "../../packages/constants.js";

/**
 * Resolve a wp-theme `command` for process from arguments
 * @param {string} commandFromArgv 
 * @returns {Promise<string>}
 */
export default async function resolveCommand(commandFromArgv) {
  const normalisedCommandFromArgv = commandFromArgv?.toLowerCase() ?? "";
  
  let command;
  const supportedCommand = SUPPORTED_COMMANDS.find(S_C => S_C.command === normalisedCommandFromArgv);

  if (!supportedCommand) {
    command = await select({
      message: "What'd you want to do?",
      options: SUPPORTED_COMMANDS.map(({action, command, description}) => {
        return {
          label: action,
          value: command,
          hint: description
        }
      })
    });

    if (isCancel(command)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }
  } else {
    command = supportedCommand.command;
  }

  return command;
}