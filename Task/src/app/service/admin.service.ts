import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from "../iuser";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http:HttpClient) { }
  getUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl+ '/user');
  }
  deleteUser(id:number): Observable<IUser>{
    return this.http.delete<IUser>(this.apiUrl+ `/user/${id}`);
  }
  updateUser(id:number): Observable<IUser[]>{
    return this.http.get<IUser[]>(this.apiUrl+ `/user/${id}`);
  }
}
