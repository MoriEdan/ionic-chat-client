import {Injectable} from 'angular2/core';
import {SERVER_URL} from './config';
import {Http, Headers} from 'angular2/http';
import {Observable, Observer} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

let roomURL = SERVER_URL + 'rooms/';

@Injectable()
export class RoomService {
    static get parameters() {
        return [[Http]];
    }

    constructor(http) {
        this.http = http;

        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }

    joinOpenRoom(user_id) {
        return this.http.get(roomURL + 'join/' + user_id)
            .map(res => res.json());
    }
    
    getRoom(room_id) {
        return this.http.get(roomURL + room_id)
            .map(res => res.json());
    }

    leaveRoom(room_id, user_id) {
        return this.http.delete(roomURL + room_id + '/' + user_id)
            .map(res => res.json());
    }
}