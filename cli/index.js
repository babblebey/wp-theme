import fs from "fs";
import path from "path";
import color from "picocolors";
import minimist from "minimist";
import { downloadTemplate } from "giget";
import { intro, cancel, spinner } from "@clack/prompts";
import resolveThemeName from "./lib/resolve-theme-name.js";
import { fileExists } from "./utils/file-exist.js";

async function run() {
  const cwd = process.cwd();
  // start
  intro(color.inverse("create-wp-theme"));

  // get arguments
  const argv = minimist(process.argv.slice(2));

  // get theme name from argv
  // const themeNameFromArgv = argv._[0];
  const themeName = await resolveThemeName(argv._[0])

  // instantiate spinner
  const s = spinner();

  // compute location to save file to
  const filePath = path.join(cwd, themeName);

  // check if location already exist
  if (fileExists(filePath)) {
    console.log();
    cancel(color.red(`${filePath} already exists.`));
    process.exit(1);
  }

  // state supported css framework
  const supportedCSSFramework = ["bootstrap"];

  // get specified css framework - only if supported
  const cssFramework = supportedCSSFramework.find(key => argv[key]);

  s.start("Copying theme files");

  // copy css framework related files
  const templateToCopy = `cwpt-${cssFramework}`;
  const copiedTemplate = await downloadTemplate(`github:babblebey/create-wp-theme/packages/templates/${templateToCopy}#develop`, {
    dir: themeName,
    repo: "babblebey/create-wp-theme",
    // ref: "develop",
    force: true,
    cwd: "."
  });

  // copy node_script
  const copiedNodeScript = await downloadTemplate(`github:babblebey/create-wp-theme/packages/node_scripts#develop`, {
    dir: `${themeName}/node_scripts`,
    repo: "babblebey/create-wp-theme",
    // ref: "develop",
    force: true,
    cwd: "."
  });

  // @todo: Copy base `theme` folder 
  const copiedBaseTheme = await downloadTemplate(`github:babblebey/create-wp-theme/packages/theme#develop`, {
    dir: `${themeName}/theme`,
    repo: "babblebey/create-wp-theme",
    // ref: "develop",
    force: true,
    cwd: "."
  });

  s.stop("Files copied");

  s.start("Setting things up");

  // modify placeholder in package.json `bundle` script
  const packageJsonFile = path.resolve(filePath, "package.json");
  const packageJsonContent = fs.readFileSync(packageJsonFile, "utf-8");
  fs.writeFileSync(
    packageJsonFile, 
    packageJsonContent.replace("$cwpt", themeName)
  );

  // modify placeholder in `theme/style.css`
  const styleCssFile = path.resolve(filePath, "theme/style.css");
  const styleCssContent = fs.readFileSync(styleCssFile, "utf-8");
  // write cssFramework
  fs.writeFileSync(
    styleCssFile,
    styleCssContent.replaceAll("$cssFramework", cssFramework)
  );
  // write theme name
  fs.writeFileSync(
    styleCssFile,
    styleCssContent.replaceAll("$cwpt", themeName)
  );

  /**
   * @todo consider modifying namespaces in `function.php` to theme name
   */

  s.stop("You're all set!");

  console.log("\nNow run:\n");

  console.log(`  ${color.cyan(`cd ${path.relative(cwd, filePath)}`)}`);
  console.log(`  ${color.cyan("npm install")}`);
  console.log(`  ${color.cyan("npm run watch")}`);
}

run().catch(console.error);