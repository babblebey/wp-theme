import { select, cancel, isCancel } from "@clack/prompts";
import { SUPPORTED_CSS_FRAMEWORK } from "../../packages/constants.js";

/**
 * Resolve a CSS Framework for process from arguments (present or not)
 * @param {minimist.ParsedArgs} argv 
 * @returns {string | NodeJS.Process}
 */
export default async function resolveCSSFramework(argv) {
  let cssFramework;
  
  const countOfCssFrameworksInArgv = 
    SUPPORTED_CSS_FRAMEWORK.filter(
      (framework) => argv[framework.slug]
    ).length

  if (countOfCssFrameworksInArgv === 0) {
    cssFramework = await select({
      message: "Select a CSS framework.",
      options: SUPPORTED_CSS_FRAMEWORK.map(({name, slug, website}) => {
        return {
          label: name,
          value: slug,
          hint: website
        }
      })
    });

    if (isCancel(cssFramework)) {
      cancel('Operation cancelled.');
      return process.exit(0);
    }
  } else if (countOfCssFrameworksInArgv === 1) {
    cssFramework = SUPPORTED_CSS_FRAMEWORK.find(key => argv[key.slug]);
  } else {
    console.log();
    cancel(color.red(
      `Please provide one of the currently supported flags: 
      ${SUPPORTED_CSS_FRAMEWORK.map(framework => `--${framework.slug}`).join(" ")}`
    ));
    return process.exit(1);
  }

  return cssFramework;
}