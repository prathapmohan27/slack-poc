import { Route } from '@angular/router';
import { SlackRedirectComponent } from './components/slack-redirect/slack-redirect.component';

export const appRoutes: Route[] = [
  {
    path: 'slackCallback',
    component: SlackRedirectComponent,
  },
];
