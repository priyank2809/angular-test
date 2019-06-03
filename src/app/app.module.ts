// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// components
import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { UserComponent } from './pages/components/user/user.component';
import { SignupComponent } from './pages/components/user/signup/signup.component';
import { SigninComponent } from './pages/components/user/signin/signin.component';
import { UserProfileComponent } from './pages/components/user-profile/user-profile.component';

import { UserService } from './core/services/user/user.service';
import { AuthGuard } from '../app/core/services/common/auth.guard';
import { AuthInterceptor } from '../app/core/services/common/auth.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    UserComponent,
    SignupComponent,
    SigninComponent,
    UserProfileComponent
  ],
  providers: [
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
