import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainStoreService } from '../../services/store/main-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-update-page',
  templateUrl: './employee-update-page.component.html',
  styleUrls: ['./employee-update-page.component.scss']
})
export class EmployeeUpdatePageComponent implements OnInit, OnDestroy {
  public employeeId: string;
  private subs: Subscription[] = [];

  constructor(public mainStore: MainStoreService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.route.params.subscribe(params => {
        this.employeeId = params['employeeId'];
        this.mainStore.setChangingEmployee(this.employeeId);
        console.log(this.employeeId);
      })
    );
  }

  ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
