import { Component } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';

@Component({
  selector: 'app-save-plan',
  imports: [],
  templateUrl: './save-plan.component.html',
  styleUrl: './save-plan.component.css'
})
export class SavePlanComponent {
  constructor(private groceriesService: GroceriesService) { }

  handleSavePlan() {
    this.groceriesService.saveGroceryList();
  }
}
