import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;
  showAlert: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {}

  onSubmit() {
    if (this.loginService.login(this.username, this.password)) {
      console.log('Autenticação bem-sucedida!');
      this.router.navigate(['/tutorials']);
    } else {
      console.log('Credenciais inválidas!');
      this.showAlert = true;
    }
  }
  }


