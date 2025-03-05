import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingBarProgressService } from './services/loading-bar-progress.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatProgressBarModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'groceries-app';
  loading = computed(() => this.loadingBarProgressService.loading$);

  constructor(public loadingBarProgressService: LoadingBarProgressService) { }

}
