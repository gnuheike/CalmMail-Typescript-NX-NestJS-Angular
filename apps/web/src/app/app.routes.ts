import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: '', redirectTo: '/inbox', pathMatch: 'full' },
    {
        path: 'inbox',
        loadComponent: () => import('../screens/inbox/inbox.screen.component').then((m) => m.InboxScreenComponent),
    },
];
