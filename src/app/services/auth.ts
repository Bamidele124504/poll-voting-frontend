import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + '/auth';

  // Track login state
  private authState$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  isAuthenticated$ = this.authState$.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  // SIGNUP
  signup(data: any) {

    return this.http.post<any>(
      `${this.baseUrl}/signup`,
      data,
    ).pipe(
  
      tap((res) => {
  
        // Clear old session first
        localStorage.clear();
  
        // Save NEW user session
        localStorage.setItem(
          'token',
          res.access_token,
        );
  
        localStorage.setItem(
          'userEmail',
          res.user.email,
        );
  
        localStorage.setItem(
          'role',
          res.user.role,
        );
  
        // Update auth state
        this.authState$.next(true);
      })
    );
  }

  // LOGIN
  login(credentials: any) {

    return this.http.post<any>(
      `${this.baseUrl}/login`,
      credentials,
    ).pipe(

      tap((res) => {

        // Save token
        localStorage.clear();

        localStorage.setItem(
          'token',
          res.access_token,
        );

        localStorage.setItem(
          'userEmail',
          res.user.email,
        );

        localStorage.setItem(
          'role',
          res.user.role,
        );

        this.authState$.next(true);
      })
    );
  }

  // LOGOUT
  logout() {

    localStorage.removeItem(
      'token'
    );
  
    localStorage.removeItem(
      'userEmail'
    );
  
    localStorage.removeItem(
      'role'
    );
  
    this.authState$.next(false);
  }
  // CHECK LOGIN
  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');
  }

  // CHECK ADMIN
  isAdmin(): boolean {

    return (
      localStorage.getItem(
        'role'
      ) === 'admin'
    );
  }

  // GET TOKEN
  getToken(): string | null {

    return localStorage.getItem('token');
  }

  // CURRENT USER
  getCurrentUser(): string | null {

    return localStorage.getItem('userEmail');
  }

}