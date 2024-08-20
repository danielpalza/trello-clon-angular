import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api/v1/login/';
  constructor(private http: HttpClient ) { }

  login(email: string, password: string): Observable<boolean> {
    let url = `${this.apiUrl}/auth`;
    return this.http.post<any[]>(url, {email, password} ).pipe(
      
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          return true;
        } else {
          return false;
        }
      })
    )

  }
}
