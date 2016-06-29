# Auth0 + Ionic + API Sample

This is a sample Ionic project that uses Auth0 for Authentication.
It's the basic [tabs](https://github.com/driftyco/ionic-starter-tabs) example from [Ionic](http://ionicframework.com/) with the added authentication from Auth0.

This example uses [Refresh Tokens](https://github.com/auth0/auth0-angular/blob/master/docs/refreshToken.md) so that you will see the Login page only the first time you create the app and then never again.

## Running the example

In order to run the project, you need to have `node`, `ionic`, `cordova` and `ios-sim` installed.
Once you have that, just clone the project and run the following:

1. `npm install`
2. `ionic platform add ios`
3. `ionic build ios`
4. `ionic emulate ios`

## Running an API to call

To try out the secured API call in this sample, you can get the Auth0 NodeJS API seed project from: https://auth0.com/docs/quickstart/backend/nodejs/ and just run it alongside this Ionic sample.

Enjoy your Ionic app now :).

<img src="https://cloudup.com/iMmARAM4VJZ+" />
