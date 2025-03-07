import { Component, computed, signal } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { GroceriesService } from '../../../services/groceries.service';
import { GroceryList } from '../../../models/groceryList';
import { CreateGroceryListComponent } from '../create-grocery-list/create-grocery-list.component';
import { EditGroceryListButtonComponent } from '../edit-grocery-list-button/edit-grocery-list-button.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { sharedQueryParameterGroceryListId } from '../../../../lib/constants';

@Component({
  selector: 'app-grocery-list-selector',
  imports: [ModalComponent, CreateGroceryListComponent, EditGroceryListButtonComponent, CommonModule],
  templateUrl: './grocery-list-selector.component.html',
  styleUrl: './grocery-list-selector.component.css'
})
export class GroceryListSelectorComponent {
  isModalOpen = signal<boolean>(false);
  groceryLists = computed(() => {
    if (this.isModalOpen()) {
      // Only fetch all groceries lists if modal is open
      return this.groceriesService.getAllGroceriesList()
    }
    return [];
  });
  hasFetched = computed(() => this.groceriesService.hasAlreadyFetched());

  constructor(
    private route: ActivatedRoute,
    private groceriesService: GroceriesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // Only show modal if the it's not a shared grocery list
    if (!this.route.snapshot.queryParams[sharedQueryParameterGroceryListId]) {
      // Only show the modal if there's not already a current selected list
      if (!this.groceriesService.currentGroceryList()) {
        this.isModalOpen.set(true);
      }
    }
  }

  onShowModal() {
    this.isModalOpen.set(true);
  }

  onHideModal() {
    if (this.groceriesService.currentGroceryList()) {
      this.isModalOpen.set(false);
    } else {
      this.toastr.error(
        'Select or create a grocery list to continue.', 'No list selected'
      );
    }
  }

  onSelectGroceryList(groceryList: GroceryList): void {
    if (groceryList.id !== this.groceriesService.currentGroceryList()?.id) {
      // Avoid reselecting the current grocery list because it will lead to loss of changes
      // Simply hide the modal giving the ilussion the user selected again
      this.groceriesService.currentGroceryList.set(groceryList);
    }
    this.onHideModal();
  }

  calculateTotalPrice(groceryList: GroceryList) {
    return groceryList.groceries?.reduce((sum, g) => sum + g.cost, 0) || 0;
  }
}
