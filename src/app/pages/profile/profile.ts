import {
  Component,
  OnInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { UsersService } from '../../services/users';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  user: any;

  constructor(
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {

    this.usersService.getProfile()
      .subscribe({

        next: (res) => {

          console.log(res);

          this.user = res;
        },

        error: (err) => {

          console.log(err);
        }

      });
  }

}