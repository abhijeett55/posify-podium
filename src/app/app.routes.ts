import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Login } from './_components/login/login';
import { Register } from './_components/register/register';
import { Dashboard } from './_components/dashboard/dashboard';
import { Layout } from './_components/layout/layout';
import { Sales } from './_components/sales/sales';

export const routes: Routes = [
    
    { path: 'login', component:Login},
    { path: 'register', component:Register},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard},
      { path: 'sales', component: Sales }
    ]
  },
    { path: '**', redirectTo: '/login' }
];
