import { Directive, effect, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[appHighlightInput]'
})
export class HighlightInputDirective {
  highlight = input<boolean>(false);

  constructor(private elementRef: ElementRef) {
  }

  styles = effect(() => {
    if (this.highlight()) {
      this.elementRef.nativeElement.classList.add('highlighted-input');
      this.elementRef.nativeElement.classList.add('rounded-3');
    }
  })
}
