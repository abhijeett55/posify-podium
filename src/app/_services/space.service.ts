import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Space {
  id?: string;
  name: string;
  key: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  
  private apiUrl = `${environment.apiUrl}/spaces`;

  constructor(private http: HttpClient) {}

  getSpaces(): Observable<Space[]> {
    return this.http.get<Space[]>(this.apiUrl);
  }

  createSpace(space: Space): Observable<Space> {
    return this.http.post<Space>(this.apiUrl, space);
  }


  deleteSpace(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
