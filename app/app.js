import {App, Platform, Events, IonicApp, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './services/auth-service';
import {SocketService} from './services/socket-service';
import {UserService} from './services/user-service';
import {RoomService} from './services/room-service';
import {LoadingModal} from './components/loading-modal/loading-modal';

import {Http} from 'angular2/http';
import {provide} from 'angular2/core';

@App({
  templateUrl: 'build/app.html',
  providers: [
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig, http);
      },
      deps: [Http]
    }),
    AuthService,
    SocketService,
    UserService,
    RoomService
  ],
  directives: [LoadingModal],
  config: {
    mode: 'ios'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform], [MenuController], [AuthService], [Events]];
  }

  constructor(app, platform, menu, _authService, events) {
    this.app = app;
    this.menu = menu;
    this.platform = platform;
    this.authService = _authService;
    this.events = events;
    
    this.initializeApp();
    this.rootPage = LoginPage;
    
    this.listenToLoginEvents();
  }

  logout() {
    this.menu.close();
    this.authService.logout();
    let nav = this.app.getComponent('nav');
    nav.setRoot(LoginPage);
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  
  listenToLoginEvents() {
    this.events.subscribe('user:login', (data) => {
      console.log(data);
      this.user = data[0];
    });
  }
}
