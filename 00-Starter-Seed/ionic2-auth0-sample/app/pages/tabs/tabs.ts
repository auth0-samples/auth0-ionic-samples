import {Page} from 'ionic-framework/ionic';
import {Page1} from '../page1/page1';




@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  public tab1Root;



  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Page1;


  }
}
