import { Component } from '@angular/core';
import { WpapiProvider } from '../../providers/wpapi/wpapi';
import { NavController, NavParams,LoadingController,AlertController,ActionSheetController } from 'ionic-angular';
import { SinglePage} from '../single/single'
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser} from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { AppVersion } from '@ionic-native/app-version';
import { version } from 'moment';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
//import { AppMinimize } from '@ionic-native/app-minimize';
/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  loader: any = 0;
  datas:any = [];
  searchKeyword:string = "";
  splash = true;
  searchType: boolean = false;
  pagination:number = 1;
  live:any;
  livestatus:any = 0;
  livedata:any;
  live_url:any;
  live_title:any;
  facebooklive:any;
  _appVersion:any;
  _test:any;
  _currentversion:any = "23.0.0";


  constructor(public appVersion: AppVersion,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public callNumber: CallNumber,public actionSheetCtrl: ActionSheetController,private iab:InAppBrowser,private socialSharing: SocialSharing,public navCtrl: NavController, public navParams: NavParams ,private api: WpapiProvider) {
    let confirm = this.alertCtrl.create({
      title: 'មានកំណែអាប់ដេតថ្មី',
      message: 'តើអ្នកចង់អាប់ដេតជំនាន់ថ្មីដើម្បីទទួលបានមុខងារថ្មីដែលឬទេ?',
      buttons: [  
        {
          text: 'យល់ព្រម' ,
          handler: () => {
          this.iab.create("https://chsknews.com/app","_system","localtion=no")
          }
        },
        {
          text: 'ចាកចេញ',
          handler: () => {
           
          }
        }
      ]
    });
    let loading = this.loadingCtrl.create({
      content: 'កំពុងដំណើរការ',
      spinner:'crescent'
    });
    loading.present();
    this.api.appversion().subscribe (data =>{
      if (this._currentversion != data.version){
        confirm.present();
      }else{
        confirm.dismiss();
      }
    })
    
    

  
    
  
    this.api.index(1).subscribe(datas =>{
      if(datas.length > 0){
      this.datas = datas;
      loading.dismiss(); 
      }
      
    })
    this.api.facebooklive().subscribe(live =>{
    this.facebooklive = live.data;
    })
    this.live = this.api.liveloader().subscribe(live =>{
      this.live = live;
     
      for (let i of this.live)
        {
          this.live_url = i.live_url;
          this.livedata =  i.topic;
          this.livestatus = i.live_enable; 
          this.live_title = i.title;
        }

    
    })
    
    
}  
  
   share(_url){
    this.socialSharing.share(null, null, null, _url);

   }
   opencall(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'រាយការណ៍ពត៌មានទាន់ហេតុការណ៍',
      buttons: [
        {
          text: 'Call 085 333329',
          icon: 'call',
          handler: () => {
            this.callNumber.callNumber("+85585333329", true)
          }
        },{
          icon: 'call',
          text: 'Call 098 883738',
          handler: () => {
            this.callNumber.callNumber("+85598883738", true)
          },
        },
        {
          icon: 'call',
          text: 'Call 087 225565',
          handler: () => {
            this.callNumber.callNumber("+85587225565", true)
          },
        },
        {
          icon: 'call',
          text: 'Call 097 3983333',
          handler: () => {
            this.callNumber.callNumber("+855973983333", true)
          },
        },{
          icon:'close',
          text: 'ចាកចេញ',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  
   }
  openBreaking(post_url){
    this.iab.create("https://facebook.com/"+post_url,"_system","localtion=no")
  }
  ionViewDidLoad() {
  
    
 
  }
    


 openSingle (url , title)
 {
 this.navCtrl.push(SinglePage,{
   url:url,
   title:title,
 });
 }
search(keyword){
  this.searchType = true;
  this.api.search(keyword,1).subscribe(datas => {
      this.datas = datas;
  });
}

onCancel(ev){
  this.searchType = false;
  if(!ev.target.value){
    this.api.index(1).subscribe(datas =>{
      this.datas = datas;
    })
  }
}

doRefresh(ev){
  this.api.index(1).subscribe(datas => {
    ev.complete();
    this.searchKeyword = "";
    this.pagination = 1;
    this.searchType = false;
    this.datas = datas;
    
  })
  this.live = this.api.liveloader().subscribe(live =>{
    this.live = live;
    
    for (let i of this.live)
      {
        this.live_url = i.live_url;
        this.livedata =  i.topic;
        this.livestatus = i.live_enable; 
        this.live_title = i.title;
      }
    })

    this.api.facebooklive().subscribe(live =>{
      this.facebooklive = live.data;
      })  
}

doInfinite(ev){
  this.pagination++;
  if(this.searchType == false){
    this.api.index(this.pagination).subscribe(datas =>{
      ev.complete();
      if(datas.length !== 0){
        for(let i of datas){
          this.datas.push(i);
        }
      }
    })
  }else {
    if (this.searchType == true) {
      this.api.search(this.searchKeyword,this.pagination).subscribe(datas =>{
        ev.complete();
        if(datas.length !== 0)
        {
          for(let i of datas)
          {
            this.datas.push(i);
          }
        }
      });

    }
  }
}


}
