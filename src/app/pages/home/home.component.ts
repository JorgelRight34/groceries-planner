import { Component, computed, signal } from '@angular/core';
import { DaySelectorComponent } from '../../components/day-selector/day-selector.component';
import { GroceriesComponent } from '../../components/groceries/groceries.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { GroceriesListComponent } from '../../components/groceries-list/groceries-list.component';
import { GroceriesService } from '../../services/groceries.service';
import { NavbarSmComponent } from '../../components/navbar-sm/navbar-sm.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    GroceriesComponent,
    DaySelectorComponent,
    CategoriesComponent,
    GroceriesListComponent,
    NavbarSmComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentCategory = signal<string>('');
  currentSection = signal<string>('LIST');  // For mobile users to navigate
  groceries = computed(
    () => this.groceriesService.getGroceriesByDay()
  )

  constructor(private groceriesService: GroceriesService) { }

  selectDay(day: string): void {
    this.groceriesService.currentDay.set(day);
  }

  getGroceriesForDay() {
    let result = this.groceriesService.getGroceriesByDay();
    if (this.currentCategory()) {
      result = result.filter(
        grocery => grocery.category?.name === this.currentCategory()
      );
    }
    return result;
  }

  changeCategory(category: string): void {
    this.currentCategory.set(category)
  }

  changeCurrentSection(section: string): void {
    this.currentSection.set(section);
  }
}
