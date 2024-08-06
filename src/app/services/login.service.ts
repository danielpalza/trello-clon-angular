import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

let users = [
  { email: 'usuario1@example.com', password: 'contraseña1' },
  { email: 'usuario2@example.com', password: 'contraseña2' },
  { email: 'usuario3@example.com', password: 'contraseña3' },
  { email: 'test@test.com', password: 'test' }
];

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      setTimeout(() => {
        if (email && password) {
          const user = users.find((user) => user.email === email && user.password === password);
          if (user) {
            observer.next(true); // Usuario encontrado, emite true
          } else {
            observer.next(false); // Usuario no encontrado, emite false
          }
        } 
        observer.complete(); // Completa la observación
      }, 3000);
    });
  }
}
