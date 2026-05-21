import { Component, input } from '@angular/core';

/**
 * Standalone Title component.
 * Uses Angular 18 standalone API and signals for reactive title handling.
 */
@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  template: ` <h1>{{ title() }}</h1> `,
  styles: [
    `
      h1 {
        font-family: var(--font-primary, 'Inter', sans-serif);
        color: var(--color-primary, #1e88e5);
        margin: 0;
      }
    `,
  ],
})
export class TitleComponent {
  /**
   * Two-way bound model signal for the title.
   * Acts as both an input and a writable signal.
   */
  //title = model<string>('');
  title = input.required<string>();
}
