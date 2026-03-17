import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  private api = 'http://localhost:8080/api/documents';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  return new HttpHeaders();
  }

  getDocuments() {
    return this.http.get(this.api, { headers: this.getAuthHeaders() });
  }

  uploadFile(file: File, email: string, description: string) {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);
    formData.append('description', description);

    return this.http.post(`${this.api}/upload`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  getUserDocuments(email: string) {
    return this.http.get(`${this.api}/${email}`, {
      headers: this.getAuthHeaders()
    });
  }
}