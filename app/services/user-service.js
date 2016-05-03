import {Injectable} from 'angular2/core';
import {SERVER_URL} from './config';

@Injectable()
export class UserService {
    constructor() {
    }

    setUser(user) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    removeUser() {
        this.user = null;
    }
}

    // getUser() {
    //     this.storage.get('profile').then(
    //         (profile) => {
    //             console.log(profile);
    //             return JSON.parse(profile);
    //         }
    //     );
    // }