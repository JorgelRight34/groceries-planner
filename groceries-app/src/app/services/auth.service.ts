import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `https://localhost:7240/auth`;
  user = signal<User | null>(null);

  constructor(private http: HttpClient) { }

  login(userName: string, password: string) {
    return this.http.post<{ user: User, token: string }>(`${this.apiUrl}/login`, { userName, password })
      .pipe(
        map(data => {
          this.setUserAndToken(data);
          return data;
        })
      );
  };

  loginWithGoogle(token: string) {
    return this.http.post<{ user: User, token: string }>(`${this.apiUrl}/google-login`, { token })
      .pipe(
        map(data => {
          this.setUserAndToken(data);
          return data;
        })
      )
  }

  signup(userName: string, email: string, password: string) {
    const data = { userName, email, password };

    return this.http.post<{ user: User, token: string }>(`${this.apiUrl}/register`, data)
      .pipe(
        map(data => {
          this.setUserAndToken(data);
          return data;
        })
      );
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('accessToken');
  }

  getUser() {
    this.http.get<User>(`${this.apiUrl}/`)
      .subscribe((data) => {
        this.user.set(data)
      })
  }

  setUserAndToken(data: { user: User, token: string }) {
    this.user.set(data.user);
    localStorage.setItem('accessToken', data.token);
  }
}
