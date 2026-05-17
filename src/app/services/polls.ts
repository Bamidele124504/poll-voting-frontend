import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  private baseUrl =
    environment.apiUrl + '/polls';

  constructor(
    private http: HttpClient,
  ) {}

  // Attach JWT token
  private getHeaders() {

    const token =
      localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // Get all polls
  getPolls() {

    return this.http.get<any[]>(
      this.baseUrl,
      this.getHeaders(),
    );
  }

    // Get single poll
    getPoll(id: number) {

      return this.http.get<any>(
        `${this.baseUrl}/${id}`,
        this.getHeaders(),
      );
    }
  
    // Submit vote
    vote(data: any) {
  
      return this.http.post(
        environment.apiUrl + '/votes',
        data,
        this.getHeaders(),
      );
    }

      // Create poll
  createPoll(data: any) {

    return this.http.post(
      this.baseUrl,
      data,
      this.getHeaders(),
    );
  }

    // Delete poll
    deletePoll(id: number) {

      return this.http.delete(
        `${this.baseUrl}/${id}`,
        this.getHeaders(),
      );
    }

    togglePollStatus(id: number) {

      return this.http.patch(
        `${this.baseUrl}/${id}/toggle-status`,
        {},
        this.getHeaders(),
      );
    }

      // Get poll results
  getResults(
    pollId: number,
    state?: string,
  ) {

    let url =
      `${this.baseUrl}/${pollId}/results`;

    // Optional state filter
    if (state) {
      url += `?state=${state}`;
    }

    return this.http.get<any>(
      url,
      this.getHeaders(),
    );
  }

}