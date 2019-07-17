import {NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SynthService} from './synth.service';
import {JoystickService} from './joystick.service';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {IonicGestureConfig} from './ionicGestureConfig';
import {NativeAudio} from '@ionic-native/native-audio/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
    providers: [
        JoystickService,
        SynthService,
        FileChooser,
        FilePath,
        StatusBar,
        SplashScreen,
        NativeAudio,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: IonicGestureConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
