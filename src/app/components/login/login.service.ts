import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticated: boolean = false;

  login(username: string, password: string): boolean {
    // Lógica de autenticação aqui
    if (username === 'Aluno1213' && password === 'acab') {
      this.isAuthenticated = true;
      return true; // Autenticação bem-sucedida
    } else {
      this.isAuthenticated = false;
      return false; // Autenticação falhou
    }
  }
}
