import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../_components/reports/reports';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  
  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.apiUrl, report);
  }

  
  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl);
  }

  
  deleteReport(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
  updateReport(id: string, report: Report): Observable<Report> {
    return this.http.put<Report>(`${this.apiUrl}/${id}`, report);
  }
}