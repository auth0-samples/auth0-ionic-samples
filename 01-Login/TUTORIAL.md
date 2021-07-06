# Ionic 4, Auth0, and Cordova tutorial

This tutorial has been migrated from the [auth0.com/docs] site.

## Configure Auth0

### Get Your Application Keys

When you signed up for Auth0, a new application was created for you, or you could have created a new one. You will need some details about that application to communicate with Auth0. You can get these details from the Application Settings section in the Auth0 dashboard.

You need the following information:

- **Domain**
- **Client ID**

### Add Platform

You will now need to allow Ionic / Cordova to install the necessary plugins and create file `config.xml` for the platform you wish to run on.

Use the following commands to add your desired platform(s) (e.g., `ios` or `android`):

```bash
# Add platform (e.g., ios or android)
$ ionic cordova platform add {platform}
```

### Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated. The callback URL for your app must be added to the **Allowed Callback URLs** field in your Application Settings. If this field is not set, users will be unable to log in to the application and will get an error.

The **Callback URL** to be used for your application includes your app's package ID which is found in the `config.xml` file for your app.

Go to the Application Settings section in your Auth0 dashboard and set your **Callback URL** in the **Allowed Callback URLs** box.

You should set the **Allowed Callback URL** to

```bash
# replace YOUR_PACKAGE_ID with your app package ID, and YOUR_DOMAIN with your Auth0 domain
YOUR_PACKAGE_ID://YOUR_DOMAIN/cordova/YOUR_PACKAGE_ID/callback
```

### Configure Logout URLs

A logout URL is a URL in your application that Auth0 can return to after the user has been logged out of the authorization server. This is specified in the `returnTo` query parameter. The logout URL for your app must be added to the **Allowed Logout URLs** field in your Application Settings. If this field is not set, users will be unable to log out from the application and will get an error.

You should set the **Allowed Callback URL** to

```bash
YOUR_PACKAGE_ID://YOUR_DOMAIN/cordova/YOUR_PACKAGE_ID/callback
```

Add `file` as an allowed origin to the **Allowed Origins (CORS)** in your Auth0 application settings.

To be able to make requests from your application to Auth0. Set the following origins in your Auth0 application settings:

```bash
http://localhost, ionic://localhost, http://localhost:8100
```

The origins `http://localhost` and `ionic://localhost` are needed for Android and iOS respectively, and `http://localhost:8100` is needed you're running your application with `livereaload` option.

Lastly, be sure that the **Application Type** for your application is set to **Native** in the Auth0 application settings.

## Install the Dependencies

The required dependencies for using Auth0 in an Ionic application are **auth0.js**, **auth0-cordova** and **ionic-storage**. Install them with npm or yarn.

```bash
# installation with npm
npm install auth0-js @auth0/cordova @ionic/storage --save

# installation with yarn
yarn add auth0-js @auth0/cordova @ionic/storage
```

Auth0-Cordova requires the node library `crypto`, however since Angular CLI version 6+ you are now required to use a polyfill for this library. You can accomplish this using a custom webpack configuration.

To customize the webpack configuration you need to install the custom webpack builders for angular.

```bash
# installation with npm
npm install -D @angular-builders/custom-webpack

# installation with yarn
yarn add --dev @angular-builders/custom-webpack
```

Then, create `webpack.config.js` file and add the configuration to enable the crypto pollyfill.

```js
// webpack.config.js

module.exports = {
  node: {
    crypto: true,
  },
};
```

In `angular.json` replace the `@angular-devkit/build-angular:dev-server` bulder with `@angular-builders/custom-webpack:dev-server`, `@angular-devkit/build-angular:browser` builder with `@angular-builders/custom-webpack:browser` and add customWebpackConfig to the build target options with the path to the webpack config file created prevoisly.

```js
// angular.json

"architect": {
  // ...
  "build": {
    "builder": "@angular-builders/custom-webpack:browser",
    "options": {
      "customWebpackConfig": {
        "path": "webpack.config.js"
      },
      // ...
    }
  },
  // ...
  "serve": {
    "builder": "@angular-builders/custom-webpack:dev-server",
    // ...
  }
  // ...
}
```

### Add Cordova Plugins

You must install the `SafariViewController` plugin from Cordova to be able to use universal login. The downloadable sample project already has this plugin added, but if you are embedding Auth0 in your own application, install the plugin via the command line.

```bash
# installation with cordova
ionic cordova plugin add cordova-plugin-safariviewcontroller

# installation with npm
npm install --save @ionic-native/safari-view-controller
```

The `CustomURLScheme` plugin from Cordova is also required to handle redirects properly. The sample project has it already, but if you're adding Auth0 to your own project, install this plugin as well.

```bash
ionic cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=YOUR_PACKAGE_ID --variable ANDROID_SCHEME=YOUR_PACKAGE_ID --variable ANDROID_HOST=YOUR_DOMAIN --variable ANDROID_PATHPREFIX=/cordova/YOUR_PACKAGE_ID/callback
```

Replace `YOUR_PACKAGE_ID` with your application's package name.
Replace `YOUR_DOMAIN` with your application's domain.

## Integrate Auth0 in your Application

### Modify config.xml

Update your `config.xml` to allow the Auth0 dialog to properly redirect back to your app.

```xml
<preference name="AndroidLaunchMode" value="singleTask" />
```

### Set Up URL Redirects

Use the `onRedirectUri` method from **auth0-cordova** when your app loads to properly handle redirects after authentication.

```js
// src/app/app.component.ts

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Redirect back to app after authenticating
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      }
    });
  }
}
```

### Configure Provides

Set up the providers for the authentication service and ionic storage.

```js
// src/app/app.module.ts

import { NgModule } from '@angular/core';

import { IonicStorageModule } from '@ionic/storage';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';

import { AuthService } from './services/auth.service';

// ...

@NgModule({
  // ...
  imports: [
    // ...
    IonicStorageModule.forRoot()
  ],
  providers: [
    AuthService,
    SafariViewController,
    // ...
  ],
  // ...
})
```

### Configure Auth0

Create a new file called `auth.config.ts` to provide the necessary Auth0 configuration for your Ionic app. Be sure to replace `YOUR_PACKAGE_ID` with the identifier for your app, `YOUR_CLIENT_ID` with your application's client Id (retrievable from the Auth0 application settings), and `YOUR_DOMAIN` with your Auth0 domain.

```js
// src/app/services/auth.config.ts

export const AUTH_CONFIG = {
  // Needed for Auth0 (capitalization: ID):
  clientID: "YOUR_CLIENT_ID",
  // Needed for Auth0Cordova (capitalization: Id):
  clientId: "YOUR_CLIENT_ID",
  domain: "YOUR_DOMAIN",
  packageIdentifier: "YOUR_PACKAGE_ID", // config.xml widget ID, e.g., com.auth0.ionic
};
```

### Create an Authentication Service

To coordinate authentication tasks, it's best to set up an injectable service that can be reused across the application. This service needs methods for logging users in and out, as well as checking their authentication state.

```js
// src/app/services/auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';

// Import AUTH_CONFIG, Auth0Cordova, and auth0.js
import { AUTH_CONFIG } from './auth.config';
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';

declare let cordova: any;

@Injectable()
export class AuthService {
  Auth0 = new auth0.WebAuth(AUTH_CONFIG);
  Client = new Auth0Cordova(AUTH_CONFIG);
  accessToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;

  constructor(
    public zone: NgZone,
    private storage: Storage,
    private safariViewController: SafariViewController
  ) {
    this.storage.get('profile').then(user => this.user = user);
    this.storage.get('access_token').then(token => this.accessToken = token);
    this.storage.get('expires_at').then(exp => {
      this.loggedIn = Date.now() < JSON.parse(exp);
      this.loading = false;
    });
  }

  login() {
    this.loading = true;
    const options = {
      scope: 'openid profile offline_access'
    };
    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        this.zone.run(() => this.loading = false);
        throw err;
      }
      // Set access token
      this.storage.set('access_token', authResult.accessToken);
      this.accessToken = authResult.accessToken;
      // Set access token expiration
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.storage.set('expires_at', expiresAt);
      // Set logged in
      this.loading = false;
      this.loggedIn = true;
      // Fetch user's profile info
      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          throw err;
        }
        this.storage.set('profile', profile).then(val =>
          this.zone.run(() => this.user = profile)
        );
      });
    });
  }

  logout() {
      this.accessToken = null;
      this.user = null;
      this.loggedIn = false;
      this.safariViewController.isAvailable()
        .then((available: boolean) => {
          const domain = AUTH_CONFIG.domain;
          const clientId = AUTH_CONFIG.clientId;
          const pkgId = AUTH_CONFIG.packageIdentifier;
          const url = `https://${domain}/v2/logout?client_id="${clientId}&returnTo=${pkgId}://${domain}/cordova/${pkgId}/callback`;

          if (available) {
            this.safariViewController.show({ url })
            .subscribe((result: any) => {
                if(result.event === 'opened') console.log('Opened');
                else if(result.event === 'closed') console.log('Closed');

                if (result.event === 'loaded') {
                  console.log('Loaded');
                  this.storage.remove('profile');
                  this.storage.remove('access_token');
                  this.storage.remove('expires_at');
                  this.safariViewController.hide();
                }
              },
              (error: any) => console.error(error)
            );
          } else {
            // use fallback browser
            cordova.InAppBrowser.open(url, '_system');
          }
        }
      );
    }
}
```

## Add Authentication with Auth0

Add a control to your app to allow users to log in. The control should call the `login` method from the `AuthService`. Start by injecting the `AuthService` in a component.

```js
// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(
    public auth: AuthService
  ) {}

}
```

The `AuthService` is now accessible in the view and its `login` method can be called.

```html
<!-- src/app/home/home.page.html -->

<ion-header>
  <ion-toolbar>
    <ion-title> Home </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <p *ngIf="auth.loading" class="ion-text-center">Loading...</p>
  <ng-template [ngIf]="!auth.loading">
    <!-- Not loading, not logged in: show login button -->
    <ion-button
      button
      expand="block"
      color="primary"
      *ngIf="!auth.loggedIn"
      (click)="auth.login()"
      >Log In</ion-button
    >
    <!-- Not loading, logged in: show profile and logout button -->
    <ng-template [ngIf]="auth.loggedIn">
      <ion-card *ngIf="auth.user">
        <img [src]="auth.user.picture" />
        <ion-card-content>
          <ion-card-title>{{ auth.user.name }}</ion-card-title>
          <pre>{{ auth.user | json }}</pre>
        </ion-card-content>
      </ion-card>
      <ion-button button expand="block" color="danger" (click)="auth.logout()"
        >Log Out</ion-button
      >
    </ng-template>
  </ng-template>
</ion-content>
```
