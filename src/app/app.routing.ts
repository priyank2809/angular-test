import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './pages/components/user/user.component';
import { SignupComponent } from './pages/components/user/signup/signup.component';
import { SigninComponent } from './pages/components/user/signin/signin.component';
import { UserProfileComponent } from './pages/components/user-profile/user-profile.component';

import { AuthGuard } from '../app/core/services/common/auth.guard';

const appRoutes: Routes = [
  {
    path : '', 
    redirectTo : '/login', 
    pathMatch : 'full'
  },
  {
    path : 'signup', component : UserComponent,
    children: [{
      path : '',
      component : SignupComponent
    }]
  },
  {
    path : 'login', component : UserComponent,
    children: [{
      path : '', component : SigninComponent
    }]
  },
  {
    path: 'userprofile', component : UserProfileComponent, canActivate:[AuthGuard]
    //path: 'userprofile', component : UserProfileComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
