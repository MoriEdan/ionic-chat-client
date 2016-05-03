import {Injectable} from 'angular2/core';
import {SERVER_URL} from './config';

@Injectable()
export class SocketService {
    constructor() {
        this.socket = io(SERVER_URL);
    }

    getSocket() {
        return this.socket;
    }
}



    // getSocket() {
    //     return Observable.create(
    //         (observer) => {
    //             observer.next(this.socket);
    //             observer.complete();
    //         }
    //     ).share();
    // }