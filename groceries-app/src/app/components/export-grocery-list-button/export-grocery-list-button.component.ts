import { Component, signal } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-export-grocery-list-button',
  imports: [],
  templateUrl: './export-grocery-list-button.component.html',
  styleUrl: './export-grocery-list-button.component.css'
})
export class ExportGroceryListComponent {
  isFetching = signal<boolean>(false);

  constructor(private groceriesService: GroceriesService, private toastr: ToastrService) { }

  handleDownloadPdf() {
    const groceryList = this.groceriesService.currentGroceryList();

    if (groceryList) {
      this.isFetching.set(true);  // Start loading spinner
      this.groceriesService.downloadPdf(groceryList).subscribe({
        next: this.downloadPdf,
        error: () => this.toastr.error('Oops!', 'An error has ocurred.')
      });
    }
  }

  downloadPdf(data: Blob) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `grocery-list.pdf`
    document.body.appendChild(a);
    a.click();
    this.isFetching.set(false); // Stop loading spinner
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
