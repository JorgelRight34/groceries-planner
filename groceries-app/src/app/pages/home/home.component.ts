import { Component, computed, model, signal } from '@angular/core';
import { DaySelectorComponent } from '../../components/day-selector/day-selector.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { GroceriesListComponent } from '../../components/groceries-list/groceries-list.component';
import { GroceriesService } from '../../services/groceries.service';
import { NavbarSmComponent } from '../../components/navbar-sm/navbar-sm.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { AddGroceryButtonComponent } from '../../components/add-grocery-button/add-grocery-button.component';
import { SavePlanComponent } from '../../components/save-plan/save-plan.component';
import { GroceryComponent } from '../../components/grocery/grocery.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ReceiptComponent } from '../../components/receipt/receipt.component';

@Component({
  selector: 'app-home',
  imports: [
    GroceriesListComponent,
    GroceryComponent,
    HeaderComponent,
    CommonModule,
    DaySelectorComponent,
    CategoriesComponent,
    ReceiptComponent,
    NavbarComponent,
    NavbarSmComponent
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

  constructor(private groceriesService: GroceriesService) { }

  changeCurrentSection(section: string): void {
    // For mobile users to navigate between sections
    this.currentSection.set(section);
  }

  changeSecondSection(section: string): void {
    this.currentSecondSection.set(section);
  }
}
