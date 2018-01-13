import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the WpapiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WpapiProvider {

  constructor(public http: Http) {
    //console.log('Hello WpapiProvider Provider');
  }

   index(id){
     return this.http.get('https://chsknews.com/wp-json/wp/v2/posts/?fields=id,title,date,x_featured_media,link&per_page=5&page='+id)
     .map(data => data.json());
     
   }

   search(keyword,id){
     return this.http.get("https://chsknews.com/wp-json/wp/v2/posts?_embed&?filter[order]=DESC&per_page=5&search=" + keyword + "&page="+id)
     .map(data => data.json());
   }

   category(){
     return this.http.get('https://chsknews.com/wp-json/wp/v2/categories?fields=id,name')
     .map(data => data.json());
   }

   posts_category(id,page){
     return this.http.get("https://chsknews.com/wp-json/wp/v2/posts?categories="+id+"&fields=id,title,date,x_featured_media,link&per_page=5&page="+page)
     .map(data => data.json());
   }
   ads(){
   return this.http.get("http://ads.chsknews.com/index.php").map(data => data.json());
   }
   singleads(){
   return this.http.get("http://ads.chsknews.com/single.php").map(data => data.json());
   }
   liveloader(){
     return this.http.get("http://live.chsknews.com/").map(data =>data.json());
   }
   facebooklive(){
    return this.http.get("https://ironheart-team.com/ios.php").map(data =>data.json());
  }
  facebookvideo(id,page){
    return this.http.get("https://ironheart-team.com/video.php?limit="+id+"&on=1&page="+page).map(data =>data.json());
  }
  appversion(){
    return this.http.get("https://chsknews.com/appversion.php").map(data =>data.json());
  }
}
