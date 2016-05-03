import {Page} from 'ionic-angular';
import {ChatMultiPage} from '../chat-multi/chat-multi';
import {ChatSinglePage} from '../chat-single/chat-single';

/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {
  constructor() {
    this.tab1Root = ChatSinglePage;
    this.tab2Root = ChatMultiPage;
  }
}
