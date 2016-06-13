import {App, Platform, Config} from 'ionic-framework/ionic';

import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';

import {TabsPage} from './pages/tabs/tabs';

@App({
  template: '<ion-nav id="nav" [root]="root" #content></ion-nav>',
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {},
  providers  : [HTTP_PROVIDERS,
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig(), http);
      },
      deps      : [Http]
    })]
})
export class MyApp {
  public root;
  constructor(platform: Platform) {
    this.root = TabsPage;

    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
