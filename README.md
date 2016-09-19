# Quickstart Sample for Ionic 1

This repository contains the source code for the [Ionic 1 Quickstart](https://auth0.com/docs/quickstart/native/ionic)

Please see the Quickstart itself, or the Readme's in the individual folders for more information.

## Troubleshooting

#### Lock freezing when trying to do social login or logging in with the previously logged-in user

Make sure you have the `cordova-inappbrowser` plugin installed.

```bash
ionic plugin rm cordova-plugin-inappbrowser
ionic plugin add cordova-plugin-inappbrowser
```

#### Getting "Caught exception: undefined"

Update to the latest version of Cordova

```bash
sudo npm uninstall -g cordova
sudo npm install -g cordova
```

#### Getting "Error: spawn EACCESS" error

Run `chmod +x hooks/after_prepare/010_add_platform_class.js`

#### Getting "Error: Cannot find module 'unorm'" error

Update to the latest version of Cordova iOS platform.

```bash
ionic platform rm ios
ionic platform add ios
```
