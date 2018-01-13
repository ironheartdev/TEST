import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoryPage } from '../pages/category/category';
import { IndexPage } from '../pages/index/index';
import { SinglePage } from '../pages/single/single';
import { WpapiProvider } from '../providers/wpapi/wpapi';
import { AboutPage } from '../pages/about/about';
import { FacebookPage } from '../pages/facebook/facebook';
import { VideoPage } from '../pages/video/video';
import { MomentPipe } from '../pipes/moment/moment';
import { SocialSharing } from '@ionic-native/social-sharing';
import { OneSignal } from '@ionic-native/onesignal';
import { BackgroundMode } from '@ionic-native/background-mode';
import { InAppBrowser} from '@ionic-native/in-app-browser';
import { SafePipe } from '../pipes/safe/safe';
import { CallNumber } from '@ionic-native/call-number';
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { AppVersion } from '@ionic-native/app-version';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    IndexPage,
    SinglePage,
    MomentPipe,
    AboutPage,
    FacebookPage,
    SafePipe,
    VideoPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    LazyLoadImageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoryPage,
    IndexPage,
    SinglePage,
    AboutPage,
    FacebookPage,
    VideoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WpapiProvider,
    SocialSharing,
    BackgroundMode,
    OneSignal,
    InAppBrowser,
    CallNumber,
    StreamingMedia,
    AppVersion

  ]
})
export class AppModule {}
