import { animate, transition, style, state, trigger } from '@angular/animations';

export const expandedStyles = {
  height: '*',
  'padding-top': '*',
  'padding-bottom': '*',
  'margin-top': '*',
  'margin-bottom': '*',
  opacity: '*',
  overflow: '*',
};

export const collapsedStyles = {
  height: '0',
  'padding-top': '0',
  'padding-bottom': '0',
  'margin-top': '0',
  'margin-bottom': '0',
  opacity: '0',
  overflow: 'hidden',
};

export const toVoidTransition = transition('* => void', [
  style(expandedStyles),
  animate('300ms ease-out', style(collapsedStyles)),
]);

export const fromVoidTransition = transition('void => *', [
  style(collapsedStyles),
  animate('200ms ease-out', style(expandedStyles)),
]);

export const expandCollapseAnimation = trigger('expandCollapse', [
  state('in', style(expandedStyles)),
  toVoidTransition,
  transition('void => false', [
    /* no transition on first load */
  ]),
  fromVoidTransition,
]);
