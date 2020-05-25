import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowseRequestsComponent } from './browse-requests/browse-requests.component';
import { CreateCritiqueRequestComponent } from './create-critique-request/create-critique-request.component';
import { CritiqueComponent } from './critique/critique.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ViewComponent } from './view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCritiqueComponent } from './create-critique/create-critique.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrowseRequestsComponent,
    CreateCritiqueRequestComponent,
    CritiqueComponent,
    NotFoundComponent,
    ViewComponent,
    CreateCritiqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ColorPickerModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
