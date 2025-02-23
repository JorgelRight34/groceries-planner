import { Component, input } from '@angular/core';

export type Coverage = {
  productName: string,
  developerName: string,
}


@Component({
  selector: 'app-coverage',
  imports: [],
  templateUrl: './coverage.component.html',
  styleUrl: './coverage.component.css'
})
export class CoverageComponent {
  coverage = input<Coverage>();
}
