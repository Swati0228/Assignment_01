import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import Toastify from 'toastify-js';

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
      Toastify({
        text: `<div style="display:flex; align-items:center; gap:10px;">
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #f5576c;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                 <span>Passwords do not match</span>
               </div>`,
        escapeMarkup: false,
        duration: 3000,
        gravity: "top",
        position: "right",
        className: "premium-toast error",
        style: { background: "transparent", boxShadow: "none" }
      }).showToast();
      return;
    }

    this.authService.register(this.email, this.password).subscribe({

      next: (res) => {

        Toastify({
          text: `<div style="display:flex; align-items:center; gap:10px;">
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #43e97b;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                   <span>Successfully registered! Welcome aboard.</span>
                 </div>`,
          escapeMarkup: false,
          duration: 3000,
          gravity: "top",
          position: "right",
          className: "premium-toast success",
          style: { background: "transparent", boxShadow: "none" }
        }).showToast();

        // Go to login page after successful registration
        this.router.navigate(['/login']);

      },

      error: (err) => {

        if (err.status === 400) {
          Toastify({
            text: `<div style="display:flex; align-items:center; gap:10px;">
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #f5576c;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                     <span>User already exists</span>
                   </div>`,
            escapeMarkup: false,
            duration: 3000,
            gravity: "top",
            position: "right",
            className: "premium-toast error",
            style: { background: "transparent", boxShadow: "none" }
          }).showToast();
        } else {
          Toastify({
            text: `<div style="display:flex; align-items:center; gap:10px;">
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #f5576c;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                     <span>Registration failed</span>
                   </div>`,
            escapeMarkup: false,
            duration: 3000,
            gravity: "top",
            position: "right",
            className: "premium-toast error",
            style: { background: "transparent", boxShadow: "none" }
          }).showToast();
        }

      }

    });

  }

}