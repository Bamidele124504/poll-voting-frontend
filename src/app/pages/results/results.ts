import {
  Component,
  OnInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { PollsService } from '../../services/polls';

import {
  BaseChartDirective,
} from 'ng2-charts';

import {
  ChartConfiguration,
  ChartType,
} from 'chart.js';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective,
  ],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results implements OnInit {

  results: any;

  selectedState = '';

  // Chart type
  barChartType: ChartType = 'bar';

  // Chart data
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Votes',
      },
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private pollsService: PollsService,
  ) {}

  ngOnInit(): void {

    this.loadResults();
  }

  loadResults() {

    const pollId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.pollsService.getResults(
      pollId,
      this.selectedState,
    ).subscribe({

      next: (res) => {

        console.log(res);

        this.results = res;

        // Update chart dynamically
        this.barChartData = {

          labels: res.results.map(
            (r: any) => r.option
          ),

          datasets: [
            {
              data: res.results.map(
                (r: any) => r.votes
              ),
              label: 'Votes',
            },
          ],
        };
      },

      error: (err) => {

        console.log(err);
      }

    });
  }

}