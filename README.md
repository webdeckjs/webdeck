# 🔳 Webdeck

Configure you deck using only the web browser, install plugins, and explore custom configurations and presets and profiles.

## Getting started

Visit http://webdeck.org to get started.

## Plugins

All public plugins can be find under [`webdeck-plugin`](https://github.com/search?q=topic:webdeck-plugin) topic, in github. Just paste the url of the repo into webdeck plugin and yoour ready to go.

--

To learn how to create you own plugin, check out the [create plugin docs](https://github.com/webdeckjs/webdeck/wiki/How-to-create-plugins).

## Drivers

We are planning to add driver support for other devices other then the streamdeck. Follow this repo and make a discussion on what devices we should support. The plan is to allow drivers be custom made by anyone, just like the plugins to allow max compability.

## Contributing

If you like to contribute to this application by adding new features or impoving existing ones, follow the steps bellow, remeber if you like to add a plugin

### Install dependencies

To get started, install the dependenceis

`npm install`

Once all the depedencies are installed you can start the application.

`npm run start`

Now navigate to `<App>` component and make changes.

### Deploying

This repo comes with a Github Action (CI/CD). As soon as you merge you PR to master, the application will build and be deploy to github-pages. Once complete you will be able to see the changes on the live site.
