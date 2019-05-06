import {
  trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

// Routable animations which we can use to add page transitions. Currently using opacity change
export const slideInAnimation =
  trigger('routeAnimation', [
    transition('jokes <=> joke', [
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('100ms ease-out', style({ opacity: 0}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
