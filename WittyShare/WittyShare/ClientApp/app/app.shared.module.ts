import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';

import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ArticledetailComponent } from './components/articledetail/articledetail.component';
import { CreatearticleComponent } from './components/createarticle/createarticle.component';
import { CreateeventComponent } from './components/createevent/createevent.component';
import { EventdetailComponent } from './components/eventdetail/eventdetail.component';
import { ViewprofileComponent } from './components/viewprofile/viewprofile.component';

import { EditprofileComponent } from './components/editprofile/editprofile.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomepageComponent,
        ArticledetailComponent,
        CreatearticleComponent,
        CreateeventComponent,
        EventdetailComponent,
        ViewprofileComponent,
        ContactComponent,
      AboutComponent,
      EditprofileComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
                path: 'contact', component: ContactComponent
            },
            { path: 'about', component: AboutComponent },
            { path: 'login', component: LoginComponent },
            { path: 'homepage', component: HomepageComponent },
            { path: 'articledetail', component: ArticledetailComponent },
            { path: 'createarticle', component: CreatearticleComponent },
            { path: 'createevent', component: CreateeventComponent },
            { path: 'eventdetail', component: EventdetailComponent },
            { path: 'viewprofile', component: ViewprofileComponent },
            { path: 'editprofile', component: EditprofileComponent },
            { path: '**', redirectTo: 'login' }
        ])
    ]
})
export class AppModuleShared {
}
