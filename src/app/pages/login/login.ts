import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Router,
  RouterLink,
} from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: any;

  isLoading = false;
  // Toast message
  successMessage = '';
  errorMessage = '';
  
  showPassword = false;

  togglePassword() {
  
    this.showPassword =
      !this.showPassword;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

    this.loginForm = this.fb.group({

      email: ['', [
        Validators.required,
        Validators.email,
      ]],

      password: ['', [
        Validators.required,
      ]],

    });

  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.authService.login(
      this.loginForm.value,
    ).subscribe({

      next: () => {
        this.isLoading = false;

            // Show toast
            this.successMessage =
      'Login successful';

    // Wait before navigating
    setTimeout(() => {

      this.router.navigate(['/']);

    }, 700);

    // Remove toast later
    setTimeout(() => {

      this.successMessage = '';

    }, 3000);
      },

      error: (err) => {
        this.isLoading = false;
        console.log(err);

            this.errorMessage =
      err.error.message ||
      'Login failed';

    setTimeout(() => {

      this.errorMessage = '';

    }, 3000);
      }

    });
  }

}