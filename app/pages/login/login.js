import {IonicApp, Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {AuthService} from '../../services/auth-service';
import {Observable, Observer} from 'rxjs/Rx';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  static get parameters() {
    return [[IonicApp], [NavController], [AuthService]];
  }

  constructor(app, nav, _authService) {
    this.nav = nav;
    this.authService = _authService;
    this.authType = 'login';
    this.loading = app.getComponent('loading');
  }
  
  login(credentials) {
    this.loading.show();
    this.authService.login(credentials).subscribe(
      (data) => {
        this.loading.hide();
        if (typeof data.err == 'undefined') {
          this.authService.authSuccess(data.id_token);
          this.nav.setRoot(TabsPage);
        }
      }
    );
  }

  signup(credentials) {
    this.loading.show();
    this.authService.signup(credentials).subscribe(
      (data) => {
        this.authService.authSuccess(data.id_token);
        this.loading.hide();
        this.nav.setRoot(TabsPage);
      }
    );
  }
}
