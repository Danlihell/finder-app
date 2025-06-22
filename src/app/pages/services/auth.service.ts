import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile } from '@angular/fire/auth'; // Para atualizar o perfil do usuário
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa o Firestore

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  // Método para registrar um novo usuário com nome de exibição
  async registerUser(email: string, password: string, displayName: string): Promise<void> {
    try {
      const userCredential = await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        // Atualiza o perfil do usuário com o nome de exibição
        await updateProfile(user, { displayName });
        console.log('Usuário cadastrado com sucesso:', displayName);

        // Cria o documento do usuário na coleção 'users' do Firestore
        await this.createUserDocument(user);
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }

  // Cria um documento para o usuário no Firestore
  async createUserDocument(user: any): Promise<void> {
    const userDocRef = this.firestore.collection('users').doc(user.uid);

    // Verifica se o documento do usuário já existe
    const userSnapshot = await userDocRef.get().toPromise();

    // Verifica se o userSnapshot é definido e se o documento não existe
    if (userSnapshot && !userSnapshot.exists) {
      await userDocRef.set({
        name: user.displayName || 'Usuário',
        email: user.email,
        createdAt: new Date(),
      });
      console.log('Documento do usuário criado no Firestore');
    }
  }

  // Recupera o usuário autenticado
  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.authState.subscribe(
        (user) => resolve(user),
        (error) => reject(error)
      );
    });
  }

  // Adiciona uma série ao perfil do usuário
  async addSeriesToUser(seriesId: number, seriesData: any): Promise<void> {
    try {
      const user = await this.getCurrentUser(); // Recupera o usuário autenticado
      if (user) {
        const userDocRef = this.firestore.collection('users').doc(user.uid).collection('movies');

        // Adiciona a série como documento na coleção 'movies' do usuário
        await userDocRef.doc(seriesId.toString()).set(seriesData);
        console.log('Série adicionada ao perfil do usuário');
      } else {
        console.log('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao adicionar série ao perfil do usuário:', error);
      throw error;
    }
  }

  // Método para remover uma série dos favoritos do usuário (opcional)
  async removeSeriesFromUser(seriesId: number): Promise<void> {
    try {
      const user = await this.getCurrentUser();
      if (user) {
        const userDocRef = this.firestore.collection('users').doc(user.uid).collection('movies');
        await userDocRef.doc(seriesId.toString()).delete();
        console.log('Série removida do perfil do usuário');
      } else {
        console.log('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao remover série do perfil do usuário:', error);
      throw error;
    }
  }

  // Recupera as séries do perfil do usuário
  async getUserSeries(): Promise<any[]> {
    try {
      const user = await this.getCurrentUser(); // Recupera o usuário autenticado
      if (user) {
        const seriesSnapshot = await this.firestore.collection('users').doc(user.uid).collection('movies').get().toPromise();

        // Verifica se o seriesSnapshot não é undefined e se há documentos
        if (seriesSnapshot && !seriesSnapshot.empty) {
          const seriesList = seriesSnapshot.docs.map(doc => doc.data());
          console.log('Séries recuperadas do perfil do usuário:', seriesList);
          return seriesList;
        } else {
          console.log('Nenhuma série encontrada no perfil do usuário.');
          return [];
        }
      } else {
        console.log('Usuário não autenticado');
        return [];
      }
    } catch (error) {
      console.error('Erro ao recuperar séries do perfil do usuário:', error);
      throw error;
    }
  }

  // Realiza logout
  logout() {
    return this.angularFireAuth.signOut();
  }
}
