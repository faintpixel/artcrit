import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CritiqueComponent } from './critique/critique.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { CreateCritiqueComponent } from './create-critique/create-critique.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/Forms';
import { RouterModule, Routes } from '@angular/router';

import { QuillModule } from 'ngx-quill';
import { CreateCritiqueRequestComponent } from './create-critique-request/create-critique-request.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from './material-module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';

const appRoutes: Routes = [
  // { path: 'critiques/:id', component: ViewCritiquesComponent },
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
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,

    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateCritiqueComponent
  ]
})
export class AppModule { }
