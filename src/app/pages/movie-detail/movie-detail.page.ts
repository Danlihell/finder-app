import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movieId!: number;
  movie: any;
  movieGenres: string = '';
  cast: any[] = [];
  trailers: any[] = [];
  isFavorite: boolean = false;
  userRating: string | null = null;
  watchProviders: any[] = [];
  certification: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMovieDetails();
    this.loadMovieCredits();
    this.loadMovieTrailers();
    this.loadWatchProviders();
    this.loadMovieCertification();

    // Carregar dados do Firestore para o filme
    this.userService.getUserMediaData(this.movieId).then((data: any) => {
      if (data) {
        this.isFavorite = data.isFavorite || false;
        this.userRating = data.rating || null;
      }
    });
  }

  loadMovieDetails() {
    this.tmdbService.getMovieDetails(this.movieId).subscribe((response: any) => {
      this.movie = response;
      this.movieGenres = this.movie.genres.map((genre: any) => genre.name).join(', ');
    });
  }

  loadMovieCertification() {
    this.tmdbService.getMovieCertification(this.movieId).subscribe((response: any) => {
      const brCertification = response.results.find((cert: any) => cert.iso_3166_1 === 'BR');
      this.certification = brCertification ? brCertification.release_dates[0].certification : 'N/A';
    });
  }

  loadMovieCredits() {
    this.tmdbService.getMovieCredits(this.movieId).subscribe((response: any) => {
      this.cast = response.cast;
    });
  }

  loadMovieTrailers() {
    this.tmdbService.getMovieTrailers(this.movieId).subscribe((response: any) => {
      this.trailers = response.results.filter((video: any) => video.type === 'Trailer');
    });
  }

  loadWatchProviders() {
    this.tmdbService.getMovieWatchProviders(this.movieId).subscribe((response: any) => {
      if (response.results.BR) {
        this.watchProviders = response.results.BR.flatrate || [];
      }
    });
  }

  openTrailer(videoKey: string) {
    window.open(`https://www.youtube.com/watch?v=${videoKey}`, '_blank');
  }

  async toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.movie.isFavorite = this.isFavorite;

    await this.userService.addMediaToUser(this.movie, 'movie');
  }

  async rateMovie(rating: 'like' | 'dislike') {
    this.userRating = rating;
    this.movie.like = rating === 'like';
    this.movie.dislike = rating === 'dislike';

    await this.userService.addMediaToUser(this.movie, 'movie');
  }

}
