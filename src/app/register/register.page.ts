import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Importando updateProfile
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  oApp = initializeApp(environment.firebase);
  oAuth = getAuth(this.oApp);

  gEmail = "";
  gUsername = "";
  gAddress = "";
  gPassword = "";
  gConfirmPassword = "";

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() { }

  async createUser() {
    if (!this.gEmail || !this.gUsername || !this.gAddress || !this.gPassword || !this.gConfirmPassword) {
      console.log('Preencha todos os campos.');
      return;
    }

    if (this.gPassword !== this.gConfirmPassword) {
      console.log('As senhas não coincidem.');
      return;
    }

    try {
      // Criando o usuário com Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(this.oAuth, this.gEmail, this.gPassword);
      const user = userCredential.user;
      console.log('Usuário criado com sucesso:', user);

      // Atualizando o perfil do usuário para incluir o nome
      await updateProfile(user, { displayName: this.gUsername });
      console.log('Nome do usuário atualizado para:', this.gUsername);

      // Exibindo mensagem de sucesso com alert
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Usuário cadastrado com sucesso!',
        buttons: ['OK']
      });
      await alert.present();

      // Redirecionando para a página de login após o registro
      setTimeout(() => {
        this.router.navigate(['/create-user']);
      }, 2000);

    } catch (err: any) {
      console.error('Erro ao criar usuário:', err);

      // Mensagem de erro personalizada
      let errorMessage = 'Ocorreu um erro desconhecido.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'O email fornecido não é válido.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'A senha fornecida é muito fraca. Use uma senha mais forte.';
      }

      // Exibe uma mensagem de erro com alert
      const alert = await this.alertController.create({
        header: 'Erro',
        message: errorMessage,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
