import { Component, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GroceriesService } from '../../../services/groceries.service';

@Component({
  selector: 'app-save-plan',
  imports: [],
  templateUrl: './save-plan.component.html',
  styleUrl: './save-plan.component.css'
})
export class SavePlanComponent {
  isFetching = signal<boolean>(false);

  constructor(private groceriesService: GroceriesService, private toastr: ToastrService) { }

  onSavePlan() {
    // Save plan
    this.isFetching.set(true);  // Start loading spinner
    this.groceriesService.saveGroceryList()?.subscribe({
      next: () => {
        this.isFetching.set(false); // Stop loading spinner
        this.toastr.success("Plan saved successfully", "Plan saved!")
      },
      error: () => {
        this.toastr.error("Oops!", "An error has ocurred.")
      }
    });
  }
}
