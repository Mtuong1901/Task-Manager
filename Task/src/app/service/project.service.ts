import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDuan } from "../iduan";
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5000/duan';
  constructor(private http: HttpClient) { }
  getDuan(): Observable<IDuan[]> {
    return this.http.get<IDuan[]>(this.apiUrl);
  }
  addDuan(duan: IDuan): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, duan, { headers: headers });
  }
  deleteDuan(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getDuanById(id: number): Observable<IDuan> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IDuan>(url);
  }
}
