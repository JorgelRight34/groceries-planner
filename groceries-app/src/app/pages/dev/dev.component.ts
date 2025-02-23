import { Component, signal } from '@angular/core';
import { CoverageComponent } from '../../components/coverage/coverage.component';

@Component({
  selector: 'app-dev',
  imports: [CoverageComponent],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css'
})
export class DevComponent {
  coverages = signal([
    {
      "productName": "Aplicación Demo",
      "developerName": "Juan Pérez"
    },
    {
      "productName": "Aplicación Demo",
      "developerName": "Juan Pérez"
    },
    {
      "productName": "Aplicación Demo",
      "developerName": "Juan Pérez"
    },
    {
      "productName": "Aplicación Demo",
      "developerName": "Juan Pérez"
    },
    {
      "productName": "Aplicación Demo",
      "developerName": "Juan Pérez"
    },
    {
      "productName": "Aplicación Demo",
      "developerName": "Juan Pérez"
    },
    {
      "productName": "Aplicación Demo",
      "developerName": "Juan Pérez"
    },
    {
      "productName": "Aplicación Demo",
      "developerName": "Juan Pérez"
    },
  ]);
}
