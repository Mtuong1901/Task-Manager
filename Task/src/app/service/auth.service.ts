import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private isAuthenticated = false;
  private apiUrl = 'http://localhost:5000';
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:5000/login', { username, password })
      .pipe(map(response => {
        const token = response.token;
        if (token) {
          localStorage.setItem('access_token', token);
          this.userSubject.next(this.getUserInfo());
          this.isAuthenticated = true;
          this.router.navigate(['/']);
        }
        return response; 
      }));
  }
  
  
  signup(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { username, password })
      .pipe(
        
        map(response => {
          alert('Dang ky thanh cong, chuyen sang trang DANG NHAP')
          this.router.navigate(['/login']);
          return response;
        })
      );
  }
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    this.userSubject.next(null);
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  getUserInfo(): any {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          return this.jwtHelper.decodeToken(token);
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      return !!token && !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  getToken(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token') || '';
    }
    return '';
  }
  hasRole(role: string): boolean {
    const userInfo = this.getUserInfo();
    return userInfo && userInfo.role === role;
  }
}