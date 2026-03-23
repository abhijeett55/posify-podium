import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailModel } from '../_components/emails/emails';

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  private apiUrl = 'http://localhost:8080/api/emails';
  constructor(private http: HttpClient) { }


  getAllEmails(): Observable<EmailModel[]> {
    return this.http.get<EmailModel[]>(this.apiUrl);
  }

  getEmailsByFolder(folder: string): Observable<EmailModel[]> {
    return this.http.get<EmailModel[]>(`${this.apiUrl}/folder/${folder}`);
  }

  createEmail(email: EmailModel): Observable<EmailModel> {
    return this.http.post<EmailModel>(this.apiUrl, email);
  }


}
