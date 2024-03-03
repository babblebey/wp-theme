import fs from "fs";
import path from "path";
import color from "picocolors";
import minimist from "minimist";
import { intro, cancel, spinner } from "@clack/prompts";
import { downloadTemplate } from "giget";

async function run() {
  const currentWorkingDir = process.cwd();
  // start
  intro(color.inverse("create-wp-theme"));

  // get arguments
  const argv = minimist(process.argv.slice(2));

  // get theme name from argv
  const themeNameFromArgv = argv._[0];

  // instantiate spinner
  const s = spinner();

  // compute location to save file to
  const root = path.join(currentWorkingDir, themeNameFromArgv);

  // check if location already exist
  if (fs.existsSync(root)) {
    console.log();
    cancel(color.red(`${root} already exists.`));
    process.exit(1);
  }

  // state supported css framework
  const supportedCSSFramework = ["bootstrap"];

  // get specified css framework - only if supported
  const cssFramework = supportedCSSFramework.find(key => argv[key]);

  s.start("Copying theme files.");

  // copy css framework related files
  const templateToCopy = `cwpt-${cssFramework}`;
  const copiedTemplate = await downloadTemplate(`github:babblebey/create-wp-theme/packages/templates/${templateToCopy}#develop`, {
    dir: themeNameFromArgv,
    repo: "babblebey/create-wp-theme",
    // ref: "develop",
    force: true,
    cwd: "."
  });

  // copy node_script
  const copiedNodeScript = await downloadTemplate(`github:babblebey/create-wp-theme/packages/node_scripts#develop`, {
    dir: `${themeNameFromArgv}/node_scripts`,
    repo: "babblebey/create-wp-theme",
    // ref: "develop",
    force: true,
    cwd: "."
  });

  // @todo: Copy base `theme` folder 

  s.stop("File copied");
}

run().catch(console.error);