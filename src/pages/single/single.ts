import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WpapiProvider } from '../../providers/wpapi/wpapi';
import { InAppBrowser} from '@ionic-native/in-app-browser';
/**
 * Generated class for the SinglePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {
  title:string = this.navParams.get('title');
  id:string = this.navParams.get('url')
  datas:any = [];
  guid:any;
  ads:any[];
  loader:any = 1;
  
  constructor(public loadingCtrl: LoadingController,private iab:InAppBrowser,private api: WpapiProvider,public navCtrl: NavController, public navParams: NavParams ,private http: Http ,private socialSharing: SocialSharing) {
    let loading = this.loadingCtrl.create({
      content: 'កំពុងដំណើរការ',
      spinner:'crescent'
    });
    loading.present();

    this.http.get("https://chsknews.com/wp-json/wp/v2/posts/"+this.id+"?fields=title,content,guid,date").subscribe(datas =>{
      
      this.loader = datas;
      if(this.loader !=  1){
        
        this.datas = [datas.json()]
        this.guid = ([datas.json().guid.rendered]);
        loading.dismiss();
      }

    });
    this.api.singleads().subscribe(adss => {
      this.ads = adss;
    })
  }
  openads(url){
    this.iab.create(url,"_blank","location=no,hardwareback=yes")
  }
  regularShare(){
    // share(message, subject, file, url)
    this.socialSharing.share(null, null, null, this.guid.toString());
  }
  FacebookShare(){
    // share(message, subject, file, url)
    this.socialSharing.shareViaFacebook(null, null,this.guid.toString());
  }
  twitterShare(){
   this.socialSharing.shareViaTwitter(null, null,this.guid.toString());
 }
 instagramShare(){
    this.socialSharing.shareViaInstagram(this.guid.toString(),null);
  }
  whatsappShare(){
   this.socialSharing.shareViaWhatsApp(null, null,this.guid.toString());
 }
 

}
