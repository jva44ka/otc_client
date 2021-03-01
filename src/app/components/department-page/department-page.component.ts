import { Component, OnDestroy } from '@angular/core';
import { MainStoreService } from '../../services/store/main-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from '../../models/department';

@Component({
  selector: 'app-employee-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.scss']
})
export class DepartmentPageComponent implements OnDestroy {
  public department: Department;
  private subs: Subscription[] = [];

  constructor(private mainStore: MainStoreService,
              private route: ActivatedRoute,
              private router: Router) {
    this.subs.push(
      this.route.params.subscribe(params => {
        const departmentId: string = params['departmentId'];
        console.log(departmentId);

        this.department = this.mainStore.getDepartmentById(departmentId);
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

  navigateToEmployee(id: string): void {
    this.router.navigate(['employee', id]);
  }
}
