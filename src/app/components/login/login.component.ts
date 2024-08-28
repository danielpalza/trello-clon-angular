import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { navigateToUrl } from 'single-spa';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true
})
export class LoginComponent {
  buttonDisabled: boolean = false;
  email: string = '';
  password: string = '';
  errMessage: string='';
  user = {
    email: '',
    password: ''
  };
  constructor(private loginService: LoginService) {}

  showError(msg: string) {
    this.errMessage = msg;
    setTimeout(() => {
      this.errMessage = '';
    },3000)
  }
 
  onSubmit() {
    this.buttonDisabled = true;

    if (!this.user.email || !this.user.password){
      
      this.showError("Por favor ingrese usuario y contraseña")
      this.buttonDisabled = false;
      return;
    }

    if( !this.user.email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ){
      this.showError("Por favor ingrese un correo valido")
      this.buttonDisabled = false;
      return;
    }

    this.loginService.login(this.user.email, this.user.password).subscribe((res) => {
      if (res) {
        alert('Login exitoso');
        //logica para loguear y redireccionamiento
        navigateToUrl('/');
        this.buttonDisabled = false;
      }else{
        this.showError("Credenciales incorrectas")
        this.buttonDisabled = false;
      }
    });
  }
}
