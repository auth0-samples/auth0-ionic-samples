import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthConfig, AuthModule } from '@auth0/auth0-angular';
import { domain, clientId, callbackUri } from './auth.config';

const config: AuthConfig = {
  domain,
  clientId,
  cacheLocation: 'localstorage',
  useRefreshTokens: true,
  useRefreshTokensFallback: false,
  authorizationParams: {
    redirect_uri: callbackUri
  }
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AuthModule.forRoot(config),
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule {}
