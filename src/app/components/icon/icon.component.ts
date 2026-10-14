import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="paths[name] || paths[\'spark\']"></path></svg>',
  styles: [
    ':host{display:inline-flex;width:20px;height:20px;flex-shrink:0}svg{width:100%;height:100%}',
  ],
})
export class IconComponent {
  @Input() name = 'spark';
  paths: Record<string, string> = {
    sun: 'M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    book: 'M12 5v16M12 5C9 3 5 3 2 4v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-3-1-7-1-10 1',
    calendar:
      'M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2M7 3v4m10-4v4M3 10h18M7 14h2m4 0h2m-8 3h2',
    heart: 'M12 21 3 12C-2 5 7 0 12 7c5-7 14-2 9 5Z',
    leaf: 'M5 20C-2 9 8 3 21 3c0 13-6 21-16 17Zm0 0L16 9',
    church: 'M12 2v5m-2-3h4M4 21V12l8-5 8 5v9H4m6 0v-6h4v6M7 13v2m10-2v2',
    spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z',
    arrow: 'M5 12h14m-6-6 6 6-6 6',
    check: 'm5 12 4 4L19 6',
    clock: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 7v5l3 2',
  };
}
