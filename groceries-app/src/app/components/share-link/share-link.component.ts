import { Component, computed } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { GroceryList } from '../../models/groceryList';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-share-link',
  imports: [],
  templateUrl: './share-link.component.html',
  styleUrl: './share-link.component.css'
})
export class ShareLinkComponent {
  groceryList = computed<GroceryList | null>(() => this.groceriesService.currentGroceryList());

  constructor(
    private groceriesService: GroceriesService,
    private toastr: ToastrService
  ) { }

  generateShareLink() {
    if (!this.groceryList()) return;

    const origin = window.origin;
    const link = `${origin}/?shared=true&groceryId=${this.groceryList()?.id}`
    navigator.clipboard.writeText(link).then(() => {
      this.toastr.success('Link copied on clipboard!', 'Share the link');
    });

  }
}
