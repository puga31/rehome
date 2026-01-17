import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/auth/register';
  private readonly USER_KEY = 'user';

  constructor(private http: HttpClient) {}

  // 🔐 Login backend
  login(data: LoginRequest): Observable<User> {
    return this.http.post<User>(this.loginUrl, data).pipe(
      tap(user => this.setSession(user))
    );
  }

  // 🆕 Registro backend
  register(data: RegisterRequest): Observable<User> {
    return this.http.post<User>(this.registerUrl, data);
  }

  // 💾 Guardar sesión
  private setSession(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  // 👤 Usuario completo
  getUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // 👋 Nombre (para navbar)
  getUserName(): string | null {
    return this.getUser()?.name ?? null;
  }

  // ✅ Sesión activa
  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
