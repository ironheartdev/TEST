import { Component } from '@angular/core';
import { WpapiProvider } from '../../providers/wpapi/wpapi';
import { NavController, NavParams ,LoadingController } from 'ionic-angular';
import { SinglePage} from '../single/single'
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the CategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  datas:any = [];
  pagination:number = 1;
  title:string = this.navParams.data.title;
  constructor(public socialSharing:SocialSharing,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams,private api :WpapiProvider) {
    let loading = this.loadingCtrl.create({
      content: 'កំពុងដំណើរការ',
      spinner:'crescent'
    });
    loading.present();

    this.api.posts_category(navParams.data.id,1).subscribe(datas =>{
      if (datas.length >0 ){       
        this.datas = datas;
        loading.dismiss();
      }
    })
  }

  share(_url){
    this.socialSharing.share(null, null, null, _url);

   }
  openSingle (url , title)
  {
  this.navCtrl.push(SinglePage,{
    url:url,
    title:title
  });
  }

  doInfinite(ev){
    this.pagination++;
    this.api.posts_category(this.navParams.data.id,this.pagination).subscribe(datas => {
      ev.complete();
      if(datas.length !== 0){
        for (let i of datas){
          this.datas.push(i);
        }
      }
    })
  }


}
