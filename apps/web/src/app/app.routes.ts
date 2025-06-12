import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full' },
  {
    path: 'inbox',
    loadComponent: () =>
      import('../pages/inbox/inbox.component').then((m) => m.InboxComponent),
  },
];
