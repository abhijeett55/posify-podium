import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../_services/auth';
import { ReportService } from '../../_services/report.service';


export interface Report {
  name: string;
  description: string;
  currentDate: string;
  expectedDate: string;
  budget: string;
  status: string;
  assignedTo: string;
  feedback: string;
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
  currentDate: ' ',
  expectedDate: '',
  budget: '',
  status: 'new',
  assignedTo: '',
  feedback: ''
};

constructor(private authService: Auth,
  private reportService: ReportService) {}

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

  this.reportService.createReport(this.form).subscribe({
    next: (res) => {
      console.log("Saved:", res);

      this.form = {
        name: '',
        description: '',
        currentDate: '',
        expectedDate: '',
        budget: '',
        status: 'new',
        assignedTo: this.user?.email || '',
        feedback: ''
      };
    },
    error: (err) => {
      console.error("Error saving:", err);
    }
  });
}
}
