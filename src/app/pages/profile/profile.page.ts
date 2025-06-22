import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {
    name: 'Usuário',
    email: '',
    favorites: [],
    reviews: [],
  };

  // URL base para as imagens da TMDB
  private readonly TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'; // URL original

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    await this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const currentUser = await this.authService.getCurrentUser();
      if (currentUser) {
        this.user.name = currentUser.displayName || 'Usuário';
        this.user.email = currentUser.email || '';

        // Carrega os dados de favoritos e avaliações
        const mediaDocs = await this.userService.getMediaFromUser(currentUser.uid);

        // Filtra os favoritos e avaliações
        this.user.favorites = mediaDocs.filter((media) => media.isFavorite);
        this.user.reviews = mediaDocs.filter((media) => media.like || media.dislike);

        // Não processa imagens, apenas mantemos as informações de nome e avaliação
        this.user.favorites.forEach((favorite: any) => {
          favorite.addedAt = favorite.addedAt ? new Date(favorite.addedAt) : null;
        });

        this.user.reviews.forEach((review: any) => {
          review.ratedAt = review.ratedAt ? new Date(review.ratedAt) : null;
        });
      } else {
        console.log('Usuário não autenticado.');
        this.router.navigate(['/create-user']);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
    }
  }

  goToMediaDetail(id: number, type: string) {
    if (type === 'movie') {
      this.router.navigate(['/movie', id]);  // Alterado para 'movie/:id'
    } else if (type === 'series') {
      this.router.navigate(['/series', id]);  // Alterado para 'series/:id'
    }
  }

  // Função para verificar se uma data é válida
  isValidDate(timestamp: any): boolean {
    return timestamp && !isNaN(new Date(timestamp).getTime());
  }

  editPreferences() {
    this.router.navigate(['/preferences']);
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('Logout realizado com sucesso.');
        this.router.navigate(['/create-user']);
      })
      .catch((error) => {
        console.error('Erro ao realizar logout:', error);
      });
  }
}
