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
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  showPassword = false;

  togglePassword() {
  
    this.showPassword =
      !this.showPassword;
  }

  hasUpperCase() {

    return /[A-Z]/.test(
      this.signupForm.get('password')?.value || ''
    );
  }
  
  hasLowerCase() {
  
    return /[a-z]/.test(
      this.signupForm.get('password')?.value || ''
    );
  }
  
  hasNumber() {
  
    return /\d/.test(
      this.signupForm.get('password')?.value || ''
    );
  }
  
  hasSpecialChar() {
  
    return /[@$!%*?&]/.test(
      this.signupForm.get('password')?.value || ''
    );
  }
  
  hasMinLength() {
  
    return (
      this.signupForm.get('password')
        ?.value?.length || 0
    ) >= 8;
  }

  states = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT Abuja',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ];


  signupForm: any;
  isLoading = false;
  // Toast message
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

    this.signupForm = this.fb.group({

      name: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email,
      ]],

      password: ['', [
        Validators.required,
      
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]],

      state: ['', Validators.required],

    });

  }

  onSubmit() {

    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signup(
      this.signupForm.value,
    ).subscribe({

      next: () => {
        this.isLoading = false;
        // Show toast
        this.successMessage =
  'Signup successful';

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
        this.isLoading = true;
        console.log(err);

        this.errorMessage =
        err.error.message ||
        'Signup failed';

      setTimeout(() => {

        this.errorMessage = '';

      }, 3000);
      }

    });
  }

}