import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DevComponent } from './pages/dev/dev.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "dev",
        component: DevComponent,
    },
    { path: "**", redirectTo: '' }
];
