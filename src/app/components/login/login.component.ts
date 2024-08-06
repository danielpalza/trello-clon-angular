import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, RouterModule],
  standalone: true
})
export class LoginComponent {
  buttonDisabled: boolean = false;
  email: string = '';
  password: string = '';
  errMessage: string='';
  constructor(private loginService: LoginService) {}

  showError(msg: string) {
    this.errMessage = msg;
    setTimeout(() => {
      this.errMessage = '';
    },3000)
  }
 
  login() {
    this.buttonDisabled = true;

    if (!this.email || !this.password){
      
      this.showError("Por favor ingrese usuario y contraseña")
      this.buttonDisabled = false;
      return;
    }

    if( !this.email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ){
      this.showError("Por favor ingrese un correo valido")
      this.buttonDisabled = false;
      return;
    }

    this.loginService.login(this.email, this.password).subscribe((res) => {
      if (res) {
        alert('Login exitoso');
        //logica para loguear y redireccionamiento

        this.buttonDisabled = false;
      }else{
        this.showError("Credenciales incorrectas")
        this.buttonDisabled = false;
      }
    });
  }
}
