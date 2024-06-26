import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INhanvien } from "../inhanvien";
@Injectable({
  providedIn: 'root'
})
export class NhanvienService {
  private apiUrl = 'http://localhost:5000/nhanvien';
  constructor(private http: HttpClient) { }
  getNhanvien(): Observable<INhanvien[]> {
    return this.http.get<INhanvien[]>(this.apiUrl);
  }
  addNhanvien(nhanvien: INhanvien): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, nhanvien, { headers: headers });
  }
  deleteNhanvien(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getStaffById(id:number) : Observable<any> {
    const url = `${this.apiUrl}/edit/${id}`;
    return this.http.get<any>(url);
  }
  updateStaff(id: number, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/edit/${id}`;
    return this.http.put<any>(url, updatedData);
  }
}
