import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  // Método para buscar os dados do usuário
  async getUserData(): Promise<any> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const doc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
      return doc?.data();
    }
    return null;
  }

  // Método unificado para adicionar filme ou série à subcoleção 'movies'
  async addMediaToUser(media: any, type: 'movie' | 'series') {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const userId = user.uid;
        const mediaRef = this.firestore.collection('users').doc(userId).collection('movies');
        await mediaRef.doc(media.id.toString()).set({
          id: media.id,
          type: type,
          title: media.title || media.name, // Para séries usa 'name'
          poster: media.poster_path || '',
          isFavorite: media.isFavorite || false,
          rating: media.rating || '',
          like: media.like || false,
          dislike: media.dislike || false,
          timestamp: new Date(),
        }, { merge: true });

        console.log(`${type === 'movie' ? 'Filme' : 'Série'} adicionado(a) com sucesso!`);
      }
    } catch (error) {
      console.error('Erro ao adicionar mídia:', error);
    }
  }

  // Método unificado para buscar filmes e séries do usuário
  async getMediaFromUser(userId: string): Promise<any[]> {
    try {
      const mediaDocsSnapshot = await this.firestore
        .collection('users')
        .doc(userId)
        .collection('movies')
        .get()
        .toPromise();

      if (mediaDocsSnapshot?.docs?.length) {
        return mediaDocsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }
      return [];
    } catch (error) {
      console.error('Erro ao buscar mídias do usuário:', error);
      return [];
    }
  }

  // Método para buscar dados específicos de uma mídia (filme ou série) pelo ID
  async getUserMediaData(mediaId: number): Promise<any> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const userId = user.uid;
        const doc = await this.firestore
          .collection('users')
          .doc(userId)
          .collection('movies')
          .doc(mediaId.toString())
          .get()
          .toPromise();
        return doc?.data(); // Retorna os dados da mídia, ou null se não existir
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar dados da mídia:', error);
      return null;
    }
  }

}
