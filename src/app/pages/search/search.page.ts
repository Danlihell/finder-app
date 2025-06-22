import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbService } from 'src/app/pages/services/tmdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  query: string = '';
  popularMovies: any[] = [];
  popularSeries: any[] = [];
  filteredResults: any[] = [];
  filteredSeries: any[] = [];
  selectedGenre: string = 'all';
  genres: any[] = [];

  constructor(private tmdbService: TmdbService, private router: Router) { }

  ngOnInit() {
    this.getPopularMovies();
    this.getPopularSeries();
    this.loadGenres();
  }

  search() {
    // Busca por filmes e séries
    this.filteredResults = [];
    this.filteredSeries = [];
    this.tmdbService.searchMovies(this.query).subscribe(
      (data) => {
        this.filteredResults = data.results;
        this.applyFilter();
      },
      (error) => {
        console.error(error);
      }
    );

    this.tmdbService.searchSeries(this.query).subscribe(
      (data) => {
        this.filteredSeries = data.results;
        this.applyFilter();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getPopularMovies() {
    this.tmdbService.getPopularMovies().subscribe(
      (data) => {
        this.popularMovies = data.results;
        if (this.filteredResults.length === 0 && this.query === '') {
          this.filteredResults = this.popularMovies;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getPopularSeries() {
    this.tmdbService.getPopularSeries().subscribe(
      (data) => {
        this.popularSeries = data.results;
        if (this.filteredSeries.length === 0 && this.query === '') {
          this.filteredSeries = this.popularSeries;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterByGenre(event: any) {
    this.selectedGenre = event.detail.value;
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedGenre === 'all') {
      this.filteredResults = this.query ? this.filteredResults : this.popularMovies;
      this.filteredSeries = this.query ? this.filteredSeries : this.popularSeries;
    } else {
      this.filteredResults = this.filteredResults.filter((movie) =>
        movie.genre_ids.includes(Number(this.selectedGenre))
      );
      this.filteredSeries = this.filteredSeries.filter((series) =>
        series.genre_ids.includes(Number(this.selectedGenre))
      );
    }
  }

  loadGenres() {
    this.tmdbService.getGenres().subscribe(
      (data) => {
        this.genres = data.genres;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  navigateToSeriesDetails(seriesId: number) {
    this.router.navigate(['/series', seriesId]);
  }

  // Método de navegação para a página de perfil
  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
