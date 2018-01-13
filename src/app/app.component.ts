import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WpapiProvider } from '../providers/wpapi/wpapi';
import { CategoryPage } from'../pages/category/category'
import { IndexPage } from'../pages/index/index'
import { AboutPage } from '../pages/about/about';
import { FacebookPage } from '../pages/facebook/facebook';
import { AlertController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { InAppBrowser} from '@ionic-native/in-app-browser';
import { BackgroundMode } from '@ionic-native/background-mode';
import { VideoPage } from '../pages/video/video';
import { SinglePage } from '../pages/single/single';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IndexPage;
  // rootPage: any = VideoPage;
  pages:any = [];
  home:any = 1;
  isHome:boolean = false;
  cordova:any;
  ads:any[];
  url:any;

  constructor(private backgroundMode: BackgroundMode,private iab:InAppBrowser,private oneSignal: OneSignal,public alert: AlertController,public platform: Platform, private statusBar: StatusBar, public splashScreen: SplashScreen,private api: WpapiProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.api.category().subscribe(datas =>{
      //title: datas[1].name
      //id: datas[0].id
        for (let i of datas){
        this.pages.push({
        id:i.id,
        title:i.name

        })
  }
    });
    this.api.ads().subscribe(adss => {
      this.ads = adss;
    })


  }

  initializeApp() {
    this.platform.ready().then(() => {

   
  //  var notificationOpenedCallback = function(jsonData) {
  //  console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  // };

  // //   window["plugins"].OneSignal
  // //  .startInit("bd69a064-050d-4357-bf0b-869ff121b85c", "938204423092")
  // //   .handleNotificationOpened(notificationOpenedCallback)

    
      
if (this.platform.is('android')){
  this.statusBar.backgroundColorByHexString("002871");
  this.statusBar.styleLightContent();
}else{
  this.statusBar.styleLightContent();
}
this.backgroundMode.enable();
this.backgroundMode.setDefaults({
  silent:true
});
this.splashScreen.hide();
this.oneSignal.startInit('bd69a064-050d-4357-bf0b-869ff121b85c', '938204423092');
    
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received

    });
    
    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      
      if (data.notification.payload.additionalData != null){
        this.url =  data.notification.payload.additionalData['post_id'];
         this.nav.push(SinglePage,{
        url:this.url
      })
      }else{
        //Do Nothing
      }
       });

    this.oneSignal.endInit();
    });


  }
openpage(){
  if(this.platform.is('ios')){
    this.iab.create('fb://profile/847170101987160','_system', 'location=no')
  }else{
    this.iab.create('fb://page/847170101987160','_system', 'location=no')
  }
}
openads(url){
      this.iab.create(url,"_blank","location=no,hardwareback=yes")
}
  openAbout() {
      this.nav.push(AboutPage)
    }
    openFcebook() {
        this.nav.push(FacebookPage)
      }
      openVideo() {
        this.nav.push(VideoPage)
      }
  openPage(page) {
    this.nav.setRoot(CategoryPage,{
      id: page.id,
      title: page.title
    })
    this.isHome = true;
  }
  openHome(){
    this.nav.setRoot(IndexPage);
    this.isHome = false;
  }

}
