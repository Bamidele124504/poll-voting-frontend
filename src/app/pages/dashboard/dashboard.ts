import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { PollsService } from '../../services/polls';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  polls: any[] = [];

  constructor(
    private pollsService: PollsService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {

    // Only load polls if logged in
    if (this.authService.isLoggedIn()) {
  
      this.pollsService.getPolls()
        .subscribe({
  
          next: (res) => {
  
            console.log(res);
  
            this.polls = res;
          },
  
          error: (err) => {
  
            console.log(err);
          }
  
        });
    }
  
  }

}