import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    this.authService.register(this.email, this.password).subscribe({

      next: (res) => {

        alert(res.message);

        // Go to login page after successful registration
        this.router.navigate(['/login']);

      },

      error: (err) => {

        if (err.status === 400) {
          alert("User already exists");
        } else {
          alert("Registration failed");
        }

      }

    });

  }

}