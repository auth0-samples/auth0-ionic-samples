import {Page} from 'ionic-framework/ionic';
import {Alert, NavController} from 'ionic-framework/ionic';
import {NgZone} from 'angular2/core';
import {Http} from 'angular2/http';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Auth0Vars} from '../../auth0-variables'

declare var Auth0Lock;

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  private lock = new Auth0Lock(Auth0Vars.AUTH0_CLIENT_ID, Auth0Vars.AUTH0_DOMAIN);

  public user_name = "";
  public user_email = "";
  public isAuthenticated = false;

  constructor(public nav: NavController, public zone:NgZone, public http: Http, public authHttp: AuthHttp) {

  }

  login() {
    this.lock.show((err: string, profile : Object, id_token: string) => {
      this.zone.run(() => {
        if (err) {
          throw new Error(err);
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', id_token);

        this.user_name = profile.name;
        this.user_email = profile.email;
		this.isAuthenticated = true;

      });

    });
  }

  logout() {
    this.zone.run(() => {
      localStorage.removeItem('profile');
      localStorage.removeItem('id_token');
	  this.isAuthenticated = false;
    });
  }

  loggedIn() {
    return (tokenNotExpired()&&this.isAuthenticated);
  }

  private showAlert(title: string, message: string){
    let alert = Alert.create({
      title: title,
      body: message,
      buttons: ['Ok']
    });

    this.nav.present(alert);
  }

  //Unauthenticated
  callApi() {
    console.log("callApi");
    this.http.get('http://auth0-nodejsapi-sample.herokuapp.com/ping')
        .subscribe(
            (data) => {
              console.log(data.json());
              this.showAlert("Success", data.json().text);
            },
            (err) => {
              console.log("There has been an error.");
              console.log(err);
              this.showAlert("Error", err.json());
            },
            () => {
              console.log('Complete')
            }
        );
  }
  
  //Authenticated	
  callSecuredApi() {
    console.log("callSecuredApi");
    try {
      this.authHttp.get('http://localhost:3001/secured/ping')
          .subscribe(
              data => {
                console.log(data);
				this.showAlert("Success", data._body);
              },
              err => {
                console.log("There has been an error.");
                console.log(err)
                this.showAlert("Error", "You need to download the server seed and start it to call this API");
              },
              () => {
                console.log('Complete')
              }
          );
    } catch (e) {
      console.log("There has been an error.\n" + e);
      console.log(e);
      this.showAlert("Error", e + ". Please authenticate so that you can call this API");
    }
  }
}
