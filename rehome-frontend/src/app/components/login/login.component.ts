import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // MODO
  isRegisterMode = false;

  // LOGIN
  email = '';
  password = '';

  // REGISTER
  name = '';
  confirmPassword = '';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Cambiar entre login / register
  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
  }

  // LOGIN
  login(): void {
    const request: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(request).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: () => {
        this.errorMessage = 'Email o contraseña incorrectos';
      }
    });
  }

  // REGISTER
  register(): void {

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.errorMessage = '';
        this.toggleMode(); // volver a login
      },
      error: () => {
        this.errorMessage = 'Error al registrarse (email ya usado)';
      }
    });
  }
}
