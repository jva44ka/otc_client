import { Component, OnDestroy } from '@angular/core';
import { MainStoreService } from '../../services/store/main-store.service';
import { Department } from '../../models/department';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnDestroy {
  departments: Department[] = [];
  private subs: Subscription[] = [];

  constructor(private mainStore: MainStoreService,
              private router: Router) {
    this.departments = mainStore.departmentStore$.getValue();
    this.subs.push(
      mainStore.departmentStore$.subscribe(res => {
        this.departments = res;
      })
    );
  }

  navigateToDepartment(departmentId: string): void {
    this.router.navigate(['department', departmentId]);
  }

  navigateToNewEmployee(): void {
    this.router.navigate(['employee-new']);
  }

  ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
