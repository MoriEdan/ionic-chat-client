import {Page, NavController} from 'ionic-angular';
import {UserService} from '../../services/user-service';
import {SocketService} from '../../services/socket-service';
import {RoomService} from '../../services/room-service';

@Page({
  templateUrl: 'build/pages/chat-single/chat-single.html',
})
export class ChatSinglePage {
  static get parameters() {
    return [[NavController], [UserService], [SocketService], [RoomService]];
  }

  constructor(nav, _userService, _socketService, _roomService) {
    this.nav = nav;
    this.socketService = _socketService;
    this.userService = _userService;
    this.roomService = _roomService;

    this.socket = this.socketService.getSocket();
    this.user = this.userService.getUser();

    this.input = '';
    this.msgHistory = [];
  }

  onPageWillEnter() {
    this.roomService.joinOpenRoom(this.user._id).subscribe(
      (data) => {
        this.room = data.room.value;
        this.socket.emit('subscribe', {
          room_id: this.room._id,
          user_id: this.user._id
        });
      }
    );
  }

  onPageDidEnter() {
    this.socket.on('message', (data) => {
      if(data.user._id == this.user._id) {
        var message = "Me: " + data.message;
        data.message = message;
      }
      this.msgHistory.push(data);
    });

    this.socket.on('ready', () => {
      console.log('ready');
      this.socket.emit('user', {
        room_id: this.room._id,
        user: this.user
      });
    });

    this.socket.on('share user', (user) => {
      this.otherUser = user;
    });

    this.socket.on('topic', (topic) => {
      var msg = {
        message: topic
      }
      this.msgHistory.push(msg);
    });

    this.socket.on('reconnect', () => {
      this.socket.emit('unsubscribe', {
        room_id: this.room._id
      });
      this.msgHistory.length = 0;
      this.roomService.joinOpenRoom(this.user._id).subscribe(
        (data) => {
          console.log(data);
          this.room = data.room.value;
          this.socket.emit('subscribe', {
            room_id: this.room._id,
            user_id: this.user._id
          });
        }
      );
    })
  }

  sendMessage(msg) {
    if (msg != '') {
      console.log('Sending message');
      if (msg == 'help') {
        this.socket.emit('help', {
          room_id: this.room._id
        });
      }
      else {
        var timestamp = new Date();
        var points = this.calculatePoints(timestamp);
        this.socket.emit('message', {
          room_id: this.room._id,
          user: this.user,
          message: msg,
          timestamp: timestamp,
          points: points
        });
      }
    }
    this.input = '';
  }

  doRefresh(refresher) {
    refresher.complete();
    this.roomService.leaveRoom(this.room._id, this.user._id).subscribe(
      (data) => {
        this.socket.emit('reconnect', {
          room_id: this.room._id
        });
      }
    );
  }

  calculatePoints(timestamp) {
    if (this.msgHistory.length >= 1) {
      var lastMessage = this.msgHistory[this.msgHistory.length - 1];
      if (typeof lastMessage.user._id != 'undefined' && lastMessage.user._id != this.user._id) {
        var newTS = timestamp.getTime();
        var oldTS = new Date(lastMessage.timestamp).getTime();
        var points = Math.round(1800000 / (newTS - oldTS));
        this.user.points += points;
        return points;
      }
    }
    return 0;
  }
}
