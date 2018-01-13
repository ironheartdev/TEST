import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,LoadingController,Content,AlertController } from 'ionic-angular';
import { WpapiProvider } from '../../providers/wpapi/wpapi';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
/**
 * Generated class for the VideoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  @ViewChild(Content) content: Content;

  videos:any;
  pagination:number = 1;
  constructor(public alertCtrl: AlertController,public loadingCtrl: LoadingController,private streamingMedia: StreamingMedia,public api:WpapiProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'កំពុងដំណើរការ',
      spinner:'crescent'
    });
    loading.present();
    this.api.facebookvideo(10,1).subscribe(data => {
      if(data.length !== 0){
        this.videos = data["data"];
        loading.dismiss(); 
        }
    })
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  playvideo(url){

      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'landscape'
      };

      this.streamingMedia.playVideo(url, options);
    }
    doInfinite(ev){
      this.pagination++;      
        this.api.facebookvideo(10,this.pagination).subscribe(datas =>{
          ev.complete();
          if(this.pagination == 10){
            let confirm = this.alertCtrl.create({
              title: 'វីដេអូទំព័រចុងក្រោយ',
              message: 'តើអ្នកចង់ត្រលប់ឡើងលើវិញទេ??',
              buttons: [
                {
                  text: 'Yes',
                  handler: () => {
                    this.scrollToTop();
                  }
                }
              ]
            });
            confirm.present();
            
          }
            
          if(datas.length !== 0){
            for(let i of datas["data"]){
              this.videos.push(i);
            
            }
            
          }
        })
      }
     
}
