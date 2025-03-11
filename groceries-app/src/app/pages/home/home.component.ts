import { Component, computed, model } from '@angular/core';
import { DaySelectorComponent } from '../../components/day-selector/day-selector.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { GroceriesListComponent } from '../../components/grocery-list/groceries-list/groceries-list.component';
import { GroceriesService } from '../../services/groceries.service';

import { CommonModule } from '@angular/common';
import { ReceiptComponent } from '../../components/receipts/receipt/receipt.component';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { sharedQueryParameterGroceryListId } from '../../../lib/constants';
import { MembersGalleryComponent } from '../../components/grocery-list/members-gallery/members-gallery.component';
import { GroceryComponent } from '../../components/grocery/grocery/grocery.component';
import { SharedModule } from '../../components/shared/shared.module';

@Component({
  selector: 'app-home',
  imports: [
    GroceriesListComponent,
    GroceryComponent,
    CommonModule,
    DaySelectorComponent,
    CategoriesComponent,
    ReceiptComponent,
    SharedModule,
    MembersGalleryComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentSection = model<string>('LIST');  // For mobile users to navigate
  currentSecondSection = model<string>('LIST');
  groceries = computed(
    () => this.groceriesService.getGroceriesByDayAndCategory()
  )
  hasFetched = computed(() => this.groceriesService.hasAlreadyFetched())

  constructor(
    private route: ActivatedRoute,
    private groceriesService: GroceriesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // Check if viewing a specific grocery list, may it be owned by user or shared
    const groceryListId = this.route.snapshot.queryParams[sharedQueryParameterGroceryListId];
    if (groceryListId) {
      // Get grocery list
      this.groceriesService.getGroceryList(groceryListId).subscribe({
        error: (err) => {
          if (err.status === 404) {
            this.toastr.error('Oops!', 'List not found.')
          }
        }
      })
    }
  }

  onChangeCurrentSection(section: string): void {
    // For mobile users to navigate between sections
    this.currentSection.set(section);
  }

  onChangeSecondSection(section: string): void {
    // To change from 'LIST' section and 'RECEIPT' section
    this.currentSecondSection.set(section);
  }
}
