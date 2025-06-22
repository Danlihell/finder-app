import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment.prod';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  oApp = initializeApp(environment.firebase);
  oAuth = getAuth(this.oApp);

  gEmail = '';
  gPassword = '';

  constructor(private alertController: AlertController, private router: Router) {}

  ngOnInit() {}

  async loginUser() {
    // Validação personalizada
    if (!this.gEmail || !this.gPassword) {
      await this.showAlert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (!this.isValidEmail(this.gEmail)) {
      await this.showAlert('Erro', 'Insira um e-mail válido com pelo menos 8 caracteres.');
      return;
    }

    if (this.gPassword.length < 6) {
      await this.showAlert('Erro', 'A senha precisa ter no mínimo 6 caracteres.');
      return;
    }

    // Tentativa de login
    try {
      const userCredential = await signInWithEmailAndPassword(this.oAuth, this.gEmail, this.gPassword);
      console.log('Usuário logado com sucesso:', userCredential.user);

      await this.showAlert('Sucesso', 'Você foi logado com sucesso!');
      this.router.navigate(['/search']);
    } catch (err: any) {
      console.error('Erro ao fazer login:', err);

      let errorMessage = '';
      switch (err.code) {
        case 'auth/invalid-email':
          errorMessage = 'O e-mail fornecido não é válido.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Não encontramos um usuário com este e-mail.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'A senha fornecida está incorreta.';
          break;
        default:
          errorMessage = 'Usuário ou Senha Invalidos.';
      }

      await this.showAlert('Erro', errorMessage);
    }
  }

  // Método para verificar e-mail válido
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar formato de e-mail
    return email.length > 8 && emailRegex.test(email);
  }

  // Método auxiliar para exibir alertas
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
