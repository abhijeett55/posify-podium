import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

  reports: Report[] = [];
  isSubmitting = false;

  constructor(private authService: Auth,
  private reportService: ReportService,
  @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;

      if (user) {
        this.form.assignedTo = user.email;
      }
    });

    if (!isPlatformBrowser(this.platformId)) return;

    this.loadReports();
  }

  create(status: string) {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this.form.status = status;

    this.reportService.createReport(this.form).subscribe({
      next: (res) => {
        console.log("Saved:", res);

        this.reports.push(res);

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

        this.isSubmitting = false;
      },
      error: (err) => {
        console.error("Error saving:", err);
        this.isSubmitting = false;
      }
    });
  }

  loadReports() {
    this.reportService.getReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => console.error(err)
    });
  }
}