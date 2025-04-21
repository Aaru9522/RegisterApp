import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(data: { username: string; email: string; password: string; }): Observable<{ success: boolean }> {
    console.log('Registering user', data);
    return of({ success: true });
  }
  constructor() { }
}
