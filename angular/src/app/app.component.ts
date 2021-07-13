import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import { callbackUri } from './auth.config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    App.addListener('appUrlOpen', ({ url }) => {
      if (url?.startsWith(callbackUri)) {
        if (
          url.includes('state=') &&
          (url.includes('error=') || url.includes('code='))
        ) {
          this.auth
            .handleRedirectCallback(url)
            .pipe(mergeMap(() => Browser.close()))
            .subscribe();
        } else {
          Browser.close();
        }
      }
    });
  }
}
