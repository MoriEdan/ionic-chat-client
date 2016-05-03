import {Injectable} from 'angular2/core';
import {Events} from 'ionic-angular';
import {SERVER_URL} from './config';
import {Http, Headers} from 'angular2/http';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Observer, Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {SocketService} from './socket-service';
import {UserService} from './user-service';

let loginURL = SERVER_URL + 'users/sessions/create/';
let signupURL = SERVER_URL + 'users/';

@Injectable()
export class AuthService {
    static get parameters() {
        return [[Http], [SocketService], [UserService], [Events]];
    }

    constructor(http, _socketService, _userService, events) {
        this.http = http;
        this.userService = _userService;
        this.socketService = _socketService;
        this.socket = this.socketService.getSocket();
        this.events = events;

        this.jwtHelper = new JwtHelper();
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }

    authenticated() {
        return tokenNotExpired();
    }

    login(credentials) {
        credentials.socket_id = this.socket.id;
        return this.http.post(loginURL, JSON.stringify(credentials), { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    signup(credentials) {
        credentials.socket_id = this.socket.id;
        return this.http.post(signupURL, JSON.stringify(credentials), { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    logout() {
        this.userService.removeUser();
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    authSuccess(token) {
        var profileData = this.jwtHelper.decodeToken(token);
        this.userService.setUser(profileData);
        console.log(profileData);
        this.events.publish('user:login', profileData);
    }
}