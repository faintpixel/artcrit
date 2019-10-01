import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CritiqueComponent } from './critique/critique.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { CreateCritiqueComponent } from './create-critique/create-critique.component';
import { FormsModule, ReactiveFormsModule } from '@angular/Forms';

import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    CritiqueComponent,
    CreateCritiqueComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDialogModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateCritiqueComponent
  ]
})
export class AppModule { }
