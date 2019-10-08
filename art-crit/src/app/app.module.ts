import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CritiqueComponent } from './critique/critique.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateCritiqueComponent } from './create-critique/create-critique.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { QuillModule } from 'ngx-quill';
import { CreateCritiqueRequestComponent } from './create-critique-request/create-critique-request.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from './material-module';
import { BrowseRequestsComponent } from './browse-requests/browse-requests.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './view/view.component';

const appRoutes: Routes = [
  { path: 'view/:id', component: ViewComponent },
  { path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CritiqueComponent,
    CreateCritiqueComponent,
    CreateCritiqueRequestComponent,
    HomeComponent,
    NotFoundComponent,
    BrowseRequestsComponent,
    ViewComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateCritiqueComponent
  ]
})
export class AppModule { }
