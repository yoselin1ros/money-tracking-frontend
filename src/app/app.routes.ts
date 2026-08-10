import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { DashboardPage } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { RegisterPage } from './pages/register/register';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  { 
    path: 'dashboard', 
    component: DashboardPage, 
    canActivate: [authGuard] // Protected route
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
