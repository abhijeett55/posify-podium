import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private api = 'http://localhost:8080/api/spaces';

  constructor(private http: HttpClient) {}

  getSpaces(): Observable<Space[]> {
    return this.http.get<Space[]>(this.api);
  }

  createSpace(space: Space): Observable<Space> {
    return this.http.post<Space>(this.api, space);
  }


  deleteSpace(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
  
}
