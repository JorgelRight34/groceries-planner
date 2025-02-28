import { Component, computed, signal } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { GroceriesService } from '../../services/groceries.service';
import { GroceryList } from '../../models/groceryList';
import { CreateGroceryListComponent } from '../create-grocery-list/create-grocery-list.component';
import { EditGroceryListButtonComponent } from '../edit-grocery-list-button/edit-grocery-list-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grocery-list-selector',
  imports: [ModalComponent, CreateGroceryListComponent, EditGroceryListButtonComponent, CommonModule],
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
    if (this.groceriesService.currentGroceryList()) {
      this.isModalOpen.set(false);
    }
  }

  selectGroceryList(groceryList: GroceryList): void {
    this.groceriesService.currentGroceryList.set(groceryList);
    this.hideModal();
  }

  calculateTotalPrice(groceryList: GroceryList) {
    return groceryList.groceries.reduce((sum, g) => sum + g.cost, 0);
  }
}
