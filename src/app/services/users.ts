import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl =
    environment.apiUrl + '/users';

  constructor(
    private http: HttpClient,
  ) {}

  private getHeaders() {

    const token =
      localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // Get profile
  getProfile() {

    return this.http.get<any>(
      `${this.baseUrl}/profile`,
      this.getHeaders(),
    );
  }

}