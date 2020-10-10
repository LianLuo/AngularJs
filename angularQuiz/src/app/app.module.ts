import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { QuizComponent } from "./quiz/quiz.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ResultComponent } from "./result/result.component";
import { QuizService } from "./services/quiz.service";
import { FormsModule } from '@angular/forms';
import { AuthGuard } from "./services/auth.guard";
import { MockDataService } from "./services/mock-data.service";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent, 
    QuizComponent, 
    NavbarComponent, 
    ResultComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      { path: 'quiz', component: QuizComponent},
      { path: 'result', component: ResultComponent ,canActivate:[AuthGuard] },
      { path: '', redirectTo: '/register', pathMatch: 'full' }
    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      MockDataService,{ dataEncapsulation:false})
  ],
  providers: [
    QuizService,
    AuthGuard,
    MockDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
