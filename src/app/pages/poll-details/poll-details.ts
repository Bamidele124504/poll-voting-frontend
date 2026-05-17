import {
  Component,
  OnInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute,Router } from '@angular/router';

import { PollsService } from '../../services/polls';

@Component({
  selector: 'app-poll-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './poll-details.html',
  styleUrl: './poll-details.css',
})
export class PollDetails implements OnInit {

  poll: any;
  successMessage = '';
  constructor(
    private route: ActivatedRoute,
    private pollsService: PollsService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.pollsService.getPoll(id)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.poll = res;
        },

        error: (err) => {

          console.log(err);
        }

      });
  }

  vote(optionId: number) {

    const data = {
      pollId: this.poll.id,
      optionId,
    };

    this.pollsService.vote(data)
      .subscribe({

        next: () => {

          this.successMessage =
            'Vote successful';
        
          // Redirect to results
          setTimeout(() => {
        
            this.router.navigate([
              '/results',
              this.poll.id,
            ]);
        
          }, 1000);
        
          // Clear toast
          setTimeout(() => {
        
            this.successMessage = '';
        
          }, 3000);
        },
        error: (err) => {

          console.log(err);

          this.successMessage =
          err.error.message ||
          'Voting failed';
        
        setTimeout(() => {
        
          this.successMessage = '';
        
        }, 3000);
        }

      });
  }

}