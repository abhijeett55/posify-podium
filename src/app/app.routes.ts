import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Login } from './_components/login/login';
import { Register } from './_components/register/register';
import { Dashboard } from './_components/dashboard/dashboard';

export const routes: Routes = [
    { path: 'login', component:Login},
    { path: 'register', component:Register},
    { path: 'dashboard', component:Dashboard},
    { path: '', redirectTo: '/login', pathMatch: 'full' }

];
