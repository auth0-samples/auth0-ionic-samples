# Customizing Lock

This example shows how to customize the `Lock` widget. Sometimes you need to change some UI stuff so this is what we are going to do.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/native/ionic/09-customizing-lock). 

## Getting Started

To run this quickstart you can fork and clone this repo.

Be sure to set the correct values for your Auth0 application in the `www/app/auth0.variables.js` file.

To run the application

```bash
# Install the dependencies
bower install

# Get the plugins
ionic state restore --plugins

# Run
ionic serve
```


## Important Snippets

### 1. Add options on lock instance initialization

```js
/* ===== www/app.js ===== */
(function () {

  ...

  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider) {
  
    ...

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        auth: {
          redirect: false,
          params: {
            scope: 'openid',
            device: 'Mobile device'
          }
        },
        theme: {
          logo: 'https://auth0.com/lib/homepage/img/logo-tmz.svg',
          primaryColor: "#b81b1c"
        },
        languageDictionary: {
          title: "Log me in"
        }
      }
    });

   ...

  }

})();
```