import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password }).pipe(
      map((response: any) => {
        this.saveUserData(response.token, response.user);
        return response;
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
    .pipe(
        map((response: any) => {  
        this.saveUserData(response.token, response.user);
        return response;
      })
    );
  }

  saveUserData(token: string, user: any): void {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('token', token);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem('user', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  logout() : void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private getUserFromStorage(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
