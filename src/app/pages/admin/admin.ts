import { Component } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { PollsService } from '../../services/polls';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  successMessage = '';

  errorMessage = '';

  pollForm: any;

  polls: any[] = [];

  constructor(
    private fb: FormBuilder,
    private pollsService: PollsService,
  ) {

    this.pollForm = this.fb.group({

      title: ['', Validators.required],

      description: ['', Validators.required],

      options: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
      ]),

    });

    // Load polls immediately
    this.loadPolls();

  }

  // Access options array
  get options(): FormArray {

    return this.pollForm.get(
      'options'
    ) as FormArray;
  }

  // Load polls
  loadPolls() {

    this.pollsService.getPolls()
      .subscribe({

        next: (res) => {

          this.polls = res;
        },

        error: (err) => {

          console.log(err);
        }

      });
  }

  // Add more option
  addOption() {

    if (this.options.length >= 4) {
      return;
    }

    this.options.push(
      this.fb.control('')
    );
  }

  // Create poll
  createPoll() {

    if (this.pollForm.invalid) {
      return;
    }

    this.pollsService.createPoll(
      this.pollForm.value,
    ).subscribe({

      next: () => {
    this.successMessage =
      'Poll created succesfully';

    setTimeout(() => {

      this.successMessage = '';

    }, 3000);

        // Refresh polls
        this.loadPolls();

        // Reset form
        this.pollForm.reset();

      },

      error: (err) => {

        console.log(err);

        this.errorMessage =
        err.error.message ||
        'Failed to create poll';
      
      setTimeout(() => {
      
        this.errorMessage = '';
      
      }, 3000);
      }

    });
  }

  // Delete poll
  deletePoll(id: number) {

    const confirmDelete =
      confirm('Delete this poll?');

    if (!confirmDelete) {
      return;
    }

    this.pollsService.deletePoll(id)
      .subscribe({

        next: () => {

          this.successMessage =
        'Poll deleted successfully';

      setTimeout(() => {

        this.successMessage = '';

      }, 3000);

          // Refresh polls
          this.loadPolls();

        },

        error: (err) => {

          console.log(err);

          this.errorMessage =
        err.error.message ||
        'Delete failed';

      setTimeout(() => {

        this.errorMessage = '';

      }, 3000);
        }

      });
  }

  togglePollStatus(id: number) {

    this.pollsService
      .togglePollStatus(id)
      .subscribe({
  
        next: () => {
  
          this.loadPolls();
        },
  
        error: (err) => {
  
          console.log(err);
  
          this.errorMessage =
          err.error.message ||
          'failed to update poll';

        setTimeout(() => {

          this.errorMessage = '';

        }, 3000);
        }
  
      });
  }
}