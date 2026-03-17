import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../_services/auth';

export interface Report {
  name: string;
  description: string;
  expectedDate: string;
  budget: string;
  status: string;
  assignedTo: string;
}


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {

  user: any = null;

  form: Report = {
  name: '',
  description: '',
  expectedDate: '',
  budget: '',
  status: 'new',
  assignedTo: ''
};

constructor(private authService: Auth) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;

      if (user) {
        this.form.assignedTo = user.email;
      }
    });
  }

  create(status: string) {
    this.form.status = status;
  console.log("Create card in:", status);
  }
}
