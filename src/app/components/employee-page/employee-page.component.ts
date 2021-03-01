import { Component, OnDestroy } from '@angular/core';
import { Department } from '../../models/department';
import { Subscription } from 'rxjs';
import { MainStoreService } from '../../services/store/main-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss']
})
export class EmployeePageComponent implements OnDestroy {
  public employee: Employee;
  public department: Department;
  private subs: Subscription[] = [];

  constructor(private mainStore: MainStoreService,
              private route: ActivatedRoute,
              private router: Router) {
    this.subs.push(
      this.route.params.subscribe(params => {
        const employeeId: string = params['employeeId'];

        this.employee = this.mainStore.getEmployeeById(employeeId);
        this.department = this.mainStore.getDepartmentByEmployeeId(employeeId);
      })
    );
  }

  ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

  navigateToMain(): void {
    this.router.navigate(['']);
  }

  navigateToChange(): void {
    this.router.navigate(['employee-update', this.employee.id]);
  }

  deleteEmployee(): void {
    this.mainStore.deleteEmployee(this.employee.id);
    this.router.navigate(['']);
  }
}
