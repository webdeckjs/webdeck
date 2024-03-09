# 🔳 Webdeck

![webdeck screenshot](https://github.com/webdeckjs/webdeck/assets/1041335/09372312-6f88-4740-a2a6-43598bc53952)

Configure your deck using only the web browser. Install plugins, explore custom configurations, presets and profiles.

## Getting started

Visit http://webdeck.org to get started.

## Plugins

Plugins are the heart and soul of Webdeck, anyone can create them and the resource bellow will guide you on you journey.

- ⭐ [How to create a Plugin](https://github.com/webdeckjs/webdeck/wiki/How-to-create-plugins)
- 📋 [List of Plugins](https://github.com/search?q=topic:webdeck-plugin)
- 📖 [Plugin API docs](https://github.com/webdeckjs/webdeck/wiki/How-to-create-plugins)




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
