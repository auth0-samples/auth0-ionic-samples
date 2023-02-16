# Ionic React + Capacitor + Auth0 Sample

This sample demonstrates authentication with Auth0 in an [Ionic React](https://ionicframework.com/react) application.

## Development guide

Build the sample:

```
npm run build
```

## Configure the sample

The sample needs to be configured with your Auth0 Client ID and Domain.

### Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub, or Microsoft Account to login.

### Create an Auth0 Application

You will need to create a Single Page Application using the [Auth0 Dashboard](https://manage.auth0.com). This will give you a Domain, Client ID, and Client Secret you will need below.

### Configure Credentials

Your project needs to be configured with your Auth0 Domain and Client ID for the authentication flow to work. These values can be retrieved from the settings page of your Auth0 application.

Copy `src/auth.config.ts.example` into a new file in the same folder called `auth.config.ts`, and replace the values with your Auth0 application credentials:

```js
export const domain = "{DOMAIN}";
export const clientId = "{CLIENT_ID}";
```

### Configure the Auth0 Application

If running on a mobile device, add the following to your **Allowed Callback URLs** settings:

```text
com.auth0.samples://{DOMAIN}/capacitor/com.auth0.samples/callback
```

If running on a mobile device, add the following to your **Allowed Logout URLs** settings:

```text
com.auth0.samples://{DOMAIN}/capacitor/com.auth0.samples/callback
```

If running on a mobile device, add the following to your **Allowed Origins (CORS)** settings:

```
capacitor://localhost, http://localhost
```

If running on a desktop browser, add the following to your **Allowed Callback URLs** settings:

```
http://localhost:3000
```

If running on a desktop browser, add the following to your **Allowed Logout URLs** settings:

```
http://localhost:3000
```

If running on a desktop browser, add the following to your **Allowed Web Origins** settings:

```
http://localhost:3000
```

### Run on the desktop

Start the app in your local browser:

```
npm start
```

### Run on a native platform

Sync assets and run:

```
# ios
npx cap run ios

# android
npx cap run android
```

## What is Auth0?

Auth0 helps you to:

- Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
- Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
- Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
- Support for generating signed [JSON Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
- Analytics of how, when and where users are logging in.
- Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a Free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub, or Microsoft Account to log in.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
