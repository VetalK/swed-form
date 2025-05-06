import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/form/form.component').then(c => c.FormComponent)
    }
];
