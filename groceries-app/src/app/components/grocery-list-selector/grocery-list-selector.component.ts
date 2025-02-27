import { Component, computed, signal } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { GroceriesService } from '../../services/groceries.service';
import { GroceryList } from '../../models/groceryList';
import { CreateGroceryListComponent } from '../create-grocery-list/create-grocery-list.component';

@Component({
  selector: 'app-grocery-list-selector',
  imports: [ModalComponent, CreateGroceryListComponent],
  templateUrl: './grocery-list-selector.component.html',
  styleUrl: './grocery-list-selector.component.css'
})
export class GroceryListSelectorComponent {
  isModalOpen = signal<boolean>(false);
  groceryLists = computed(() => this.groceriesService.groceriesLists());

  constructor(private groceriesService: GroceriesService) { }

  ngOnInit() {
    if (!this.groceriesService.currentGroceryList()) {
      this.isModalOpen.set(true);
    }
  }

  showModal() {
    this.isModalOpen.set(true);
  }

  hideModal() {
    this.isModalOpen.set(false);
  }

  selectGroceryList(groceryList: GroceryList): void {
    this.groceriesService.currentGroceryList.set(groceryList);
    this.hideModal();
  }

  deleteGroceryList(groceryList: GroceryList): void {
    if (groceryList.id) {
      this.groceriesService.deleteGroceryList(groceryList.id).subscribe();
    }
  }
}
