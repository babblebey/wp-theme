# WP Theme

wp-theme is a command-line tool designed to streamline WordPress theme development. With an intuitive interface, it empowers you to create, manage, and customize WordPress themes effortlessly.

```shell
npm install wp-theme -g
```

## Quick start

Generate your starter theme/boilerplate with your favorite CSS framework by running the command below:

### Bootstrap

```shell
npx wp-theme new <theme-name> --bootstrap
```

### Material Design

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