import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';
import { PollDetails } from './pages/poll-details/poll-details';
import { Results } from './pages/results/results';
import { Admin } from './pages/admin/admin';
import { Profile } from './pages/profile/profile';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [

  {
    path: '',
    component: Dashboard,
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'signup',
    component: Signup,
  },

  {
    path: 'poll/:id',
    component: PollDetails,
    canActivate: [authGuard],
  },

  {
    path: 'results/:id',
    component: Results,
    canActivate: [authGuard],
  },

  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard, adminGuard],
  },

  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
  },

];