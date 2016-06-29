# Auth0 + Ionic + Firebase Sample

This is a sample Ionic project that uses Auth0 for Authentication and Firebase for storing information. 
It's the basic [tabs](https://github.com/driftyco/ionic-starter-tabs) example from [Ionic](http://ionicframework.com/) with the added authentication from Auth0 and Firebase as the backend.

This example uses [Refresh Tokens](https://github.com/auth0/auth0-angular/blob/master/docs/refreshToken.md) so that you will see the Login page only the first time you create the app and then never again.

## Running the example

In order to run the project, you need to have `node`, `ionic`, `cordova` and `ios-sim` installed.
Once you have that, just clone the project and run the following:

1. `npm install`
2. `ionic platform add ios`
3. `ionic build ios`
4. `ionic emulate ios`

Enjoy your Ionic app now :).

