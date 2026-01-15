import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth/login'; // Cambia si tu backend está en otra URL

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<User> {
    return this.http.post<User>(this.apiUrl, data);
  }

  logout() {
    localStorage.removeItem('user');
  }

  setSession(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
