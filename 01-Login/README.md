# Auth0 Ionic Login

This sample demonstrates how to add authentication to an Ionic application using Auth0's Lock widget from the hosted login page.

## Getting Started

If you haven't already done so, [sign up](https://auth0.com) for your free Auth0 account and create a new client in the [dashboard](https://manage.auth0.com). Find the **domain** and **client ID** from the settings area.

### Callback URL

The Callback URL is the location in your app that users will be redirected to once authentication is complete. For Ionic applications, the format of the **Callback URL** is as such:

```bash
YOUR_PACKAGE_ID://YOUR_AUTH0_DOMAIN/cordova/YOUR_PACKAGE_ID/callback
```

Where:

* `YOUR_PACKAGE_ID` is the app identifier found in `config.xml`. Ex: `io.ionic.starter`.
* `YOUR_AUTH0_DOMAIN` is your Auth0 tenant domain found in your client settings. Ex: `<tenant>.auth0.com`.

Be sure to add the appropriate **Callback URL** to the **Allowed Callback URLs** box in the client settings for your client in the Auth0 dashboard.

### CORS

Set up CORS (Cross Origin Resource Sharing) in your dashboard so that Auth0 can accept your requests. Add `file://*` to the **Allowed Origins** box in your client settings.

### Client Type

In the client settings for your app, be sure to set the **Client Type** to **Native** so that Auth0 knows what kind of requests to expect. Even though this is a web app packaged as a native one, you'll need to set it to **Native**.

## Install the Dependencies

Install **auth0.js** and **auth0-cordova**.

```bash
npm install auth0-js @auth0/cordova --save
```

The provided sample makes use of **browserify**. Install it globally.

```bash
npm install -g browserify --save
```

## Install Cordova Plugins

Several Cordova plugins are required for use with `@auth0/cordova`. Install `safariviewcontroller` and `customurlscheme` with the following commands.

```bash
ionic cordova plugin add cordova-plugin-safariviewcontroller
```

```bash
ionic cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_HOST={YOUR_AUTH0_DOMAIN} --variable ANDROID_PATHPREFIX=/cordova/{YOUR_PACKAGE_ID}/callback
```

The variables used when installing `cordova-plugin-customurlscheme` are the same as those used to set up the **Callback URL** in your Auth0 Dashboard.

### Reinstalling Plugins

Instead of changing plugin configuration manually, it is better to re-install the plugin entirely. First, do a remove: `ionic cordova plugin remove <plugin>` then re-add it as done above.

## Set AndroidLaunchMode 

In your `config.xml` file, add this preference:
```
 <preference name="AndroidLaunchMode" value="singleTask" />
```

## Set Auth0 Variables

If you downloaded this sample from Auth0's docs page, it will come pre-populated with the keys for your client. If you are cloning it directly from Github, you will need to supply the keys yourself. The necessary keys are `clientId`, `domain`, and `packageIdentifier` which are all set in `www/js/services.js`.

## Running the App

**Browserify** is used to bundle the JavaScript files for the application so that **auth0.js** and **auth0-cordova** can be `require`d in the project. Before starting the app, run **browserify** to bundle the files.

If you haven't already installed **browserify**, be sure to do so.

```bash
npm install -g browserify --save

cd www/js
browserify app.js controllers.js services.js > bundle.js
```

> **Q:** Why Browserify? Aren't there newer/better bundlers out there?
> **A:** Browserify is used here as a simple means to bundle the JavaScript files and allow npm modules to be `require`d. Feel free to use whichever bundler you prefer in your own project.

Ensure that you have an Ionic-supported platform added: `ionic cordova platform add android` or `ionic cordova platform add ios`. Then, you can do either `ionic cordova emulate <platform>` or `ionic cordova run <platform>`, depending on if you want to start the project in an emulator or run it on a real device, respectively.

> **Note:** The **auth0-cordova** package will only work when the app is being run in an emulator or on a real device. Errors will be encountered if trying to log in when testing in the browser.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.