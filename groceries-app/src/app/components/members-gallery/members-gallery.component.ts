import { Component, computed } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';

@Component({
  selector: 'app-members-gallery',
  imports: [],
  templateUrl: './members-gallery.component.html',
  styleUrl: './members-gallery.component.css'
})
export class MembersGalleryComponent {
  members = computed(() => this.groceriesService.currentGroceryList()?.members)

  constructor(private groceriesService: GroceriesService) { }
}

