import fs from "fs";
import path from "path";
import color from "picocolors";
import minimist from "minimist";
import { intro, cancel, spinner } from "@clack/prompts";
import { downloadTemplate } from "giget";

async function run() {
  const cwd = process.cwd();
  // start
  intro(color.inverse("create-wp-theme"));

  // get arguments
  const argv = minimist(process.argv.slice(2));

  // get theme name from argv
  const themeNameFromArgv = argv._[0];

  // instantiate spinner
  const s = spinner();

  // compute location to save file to
  const root = path.join(cwd, themeNameFromArgv);

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
  const copiedBaseTheme = await downloadTemplate(`github:babblebey/create-wp-theme/packages/theme#develop`, {
    dir: `${themeNameFromArgv}/theme`,
    repo: "babblebey/create-wp-theme",
    // ref: "develop",
    force: true,
    cwd: "."
  });

  s.stop("File copied");

  s.start("Setting things up.");

  // @todo: Modify files, set up theme name in respective places

  s.stop("You are all set");

  console.log("\nNow run:\n");

  console.log(`  ${color.cyan(`cd ${path.relative(cwd, root)}`)}`);
  console.log(`  ${color.cyan("npm install")}`);
  console.log(`  ${color.cyan("npm run watch")}`);
}

run().catch(console.error);