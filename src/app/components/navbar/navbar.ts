import { Component } from '@angular/core';

import {
  RouterLink,
  Router,
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  successMessage = '';
  menuOpen = false;
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  logout() {

    this.successMessage =
      'Thanks for using Poll Voting App 👋';
  
    setTimeout(() => {
  
      this.authService.logout();
  
      this.router.navigate(['/login']);
  
    },800);
  
    setTimeout(() => {
  
      this.successMessage = '';
  
    }, 1000);
  }

  toggleMenu() {

    this.menuOpen = !this.menuOpen;
  }

}