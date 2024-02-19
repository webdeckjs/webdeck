# 🔳 Webdeck

Configure your deck using only the web browser. Install plugins, explore custom configurations, presets and profiles.

## Getting started

Visit http://webdeck.org to get started.

## Plugins

All public plugins can be found under [`webdeck-plugin`](https://github.com/search?q=topic:webdeck-plugin) topic, in github. Just paste the url of the repo into webdeck and you're ready to go.

--

To learn how to create your own plugin, check out the [create plugin docs](https://github.com/webdeckjs/webdeck/wiki/How-to-create-plugins).

## Drivers

We are planning to add driver support for other devices other than the Stream Deck. Consider following this repo and make a [discussion](https://github.com/webdeckjs/webdeck/discussions) on what devices we should support. The plan is to allow drivers to be just like the plugins, made by anyone, for maximum compatibility.

## Contributing

If you would like to contribute to this application by adding new features or improve existing ones, follow the steps below.

### Install dependencies

To get started, install the dependencies

`npm install`

Once all the dependencies are installed you can start the application.

`npm run start`

Now navigate to `<App>` component and make changes.

### Deploying

This repo comes with a Github Action (CI/CD). As soon as you merge you PR to master, the application will build and be deployed to github-pages. Once complete you will be able to see the changes on the live site.
