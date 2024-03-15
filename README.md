# WP Theme

A one-stop solution for crafting WordPress themes with finesse. Seamlessly bundled with a powerful tools that simplifies your development workflow.

## Quick start

### Online Generator

Get Started by generating your theme with your favorite CSS framework with our [online generator](#) (wip***)

or

### CLI Tool

You can use our cli tool by running the command below with your favorite CSS framework:

#### Bootstrap

```shell
npx wp-theme new <theme-name> --bootstrap
```

#### Material Design 

```shell
npx wp-theme new <theme-name> --material
```

### Installation

1. Move this folder to `wp-content/themes` in your local development environment
2. Navigate into your theme's folder and run `npm install && npm run dev` 
3. Activate the theme in your WordPress administrative panel

### Development

#### Without Hot Reload
Track changes in your `style` and `script` folder and build the output in real-time.

4. Run `npm run watch`

#### With Hot Reload (Recommended)
Track changes across your `style`, `script` and `theme` folder, auto-update your theme in real-time and refreshes your browser.

4. Open the `package.json` and replace the url string `dev.local` in the `watch:changes` script with the url of your currently running server
5. Run `npm run serve` or if you would like to enable a tunnel exposing your localhost to a publicly available url, run `npm run serve:tunnel`.

### Deployment

6. Run `npm run build`
7. Take the resulting `zip` file and upload to your website, through the administrative panel's appearance upload theme page.

## What's Included?

- **Scaffold Themes** - Quickly generate new WordPress theme with essential files and configurations to jumpstart theme development with your selected css framework baked in ready to use.

- **Hot Reload** - Experience Automatically updates your code in real-time as you make changes to your code, ensuring that your changes are instantly reflected in the browser without requiring manual refreshes.

- **Live Tunnel** - Exposes your local development environment (i.e. localhost) publicly accessible URL online, lets you showcase and test your WordPress theme in a live environment, allowing collaborators and your clients to preview your work.

- **Script Bundling** - Ready to bundle JavaScript files, making it easier to manage dependencies and optimize the performance of your theme.

- **Style Compilation/Bundling** - A Compiler ready to transform your Sass/SCSS or plain CSS files into compressed CSS, allowing you to write styles more efficiently and modularly.

- **Style Prefixing** - Get automatic addition of vendor prefixes to CSS code, to ensuring that your styles works correctly and its compatible across different web browsers.

- **Theme Bundling (with Automatic Versioning)** - Generate your final production-ready theme bundle zip with automatic version incrementing in the `funtions.php` file.

Whether you're a seasoned developer or just starting with WordPress theme development, the Create WP Theme Toolkit empowers you to create exceptional themes with ease.