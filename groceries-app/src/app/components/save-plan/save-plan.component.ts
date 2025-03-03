import { Component, signal } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-save-plan',
  imports: [],
  templateUrl: './save-plan.component.html',
  styleUrl: './save-plan.component.css'
})
export class SavePlanComponent {
  isFetching = signal<boolean>(false);

  constructor(private groceriesService: GroceriesService, private toastr: ToastrService) { }

  handleSavePlan() {
    this.isFetching.set(true);  // Start loading spinner
    this.groceriesService.saveGroceryList().subscribe(() => {
      this.isFetching.set(false); // Stop loading spinner
      this.toastr.success("Plan saved successfully", "Plan saved!")
    });
  }
}
