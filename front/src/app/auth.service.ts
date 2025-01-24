import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private imagesApiUrl = 'http://localhost:3000/images';
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  jwtDecode(token: string): any {
    try {
      const payload = token.split('.')[1]; // La 2ème partie du JWT
      const decodedPayload = atob(payload); // Décodage Base64
      return JSON.parse(decodedPayload); // Conversion en objet JSON
    } catch (error) {
      console.error('Invalid JWT token:', error);
      return null;
    }
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserInfo() {
    return this.http.get(`http://localhost:3000/users/me`);
  }

  getImages() {
    return this.http.get(`${this.imagesApiUrl}`);
  }

  likeImage(imageId: number) {
    return this.http.put(`${this.imagesApiUrl}/${imageId}/like`, {
      userId: this.getUserId(),
    });
  }

  dislikeImage(imageId: number) {
    return this.http.put(`${this.imagesApiUrl}/${imageId}/dislike`, {
      userId: this.getUserId(),
    });
  }

  private getUserId(): number {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is null');
    }
    const decoded = this.jwtDecode(token);
    return decoded.userId;
  }
}
