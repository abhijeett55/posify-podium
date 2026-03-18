import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../_components/reports/reports';


@Injectable({
  providedIn: 'root',
})

export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  createReport(report: Report): Observable<any> {
    return this.http.post(this.apiUrl, report);
  }
}
