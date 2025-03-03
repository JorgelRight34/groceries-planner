import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "planner",
        pathMatch: "full"
    },
    {
        path: "planner",
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard],
    },
    {
        path: "hero",
        loadComponent: () => import('./pages/hero/hero.component').then(m => m.HeroComponent)
    },
    {
        path: "login",
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: "signup",
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
    },
    { path: "**", redirectTo: '' }
];
