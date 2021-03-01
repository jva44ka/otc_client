import { Component } from '@angular/core';
import { MainStoreService } from '../../services/store/main-store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-new-page',
  templateUrl: './employee-new-page.component.html',
  styleUrls: ['./employee-new-page.component.scss']
})
export class EmployeeNewPageComponent {
  constructor(public mainStore: MainStoreService,
              private route: ActivatedRoute,
              private router: Router) {}
}
