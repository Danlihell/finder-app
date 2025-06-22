import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = 'dcd92f7ccc3440f8f78a90943580bf71';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  // Método para obter provedores de streaming de um filme
  getMovieWatchProviders(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/watch/providers`, {
      params: {
        api_key: this.apiKey
      }
    });
  }

  // Método para obter a classificação indicativa de um filme
  getMovieCertification(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/release_dates`, {
      params: {
        api_key: this.apiKey
      }
    });
  }

  // Método para obter a classificação indicativa de uma série
  getSeriesCertification(seriesId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/${seriesId}/content_ratings`, {
      params: {
        api_key: this.apiKey
      }
    });
  }


  // Método para obter provedores de streaming de uma série
  getSeriesWatchProviders(seriesId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/${seriesId}/watch/providers`, {
      params: {
        api_key: this.apiKey
      }
    });
  }

  // Método para buscar filmes/séries por nome
  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query,
        language: 'pt-BR' // Adiciona o idioma em português do Brasil
      }
    });
  }

  // Método para buscar séries por nome
  searchSeries(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/tv`, {
      params: {
        api_key: this.apiKey,
        query: query,
        language: 'pt-BR' // Adiciona o idioma em português do Brasil
      }
    });
  }

  // Método para obter detalhes de um filme
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR' // Adiciona o idioma em português do Brasil
      }
    });
  }

  // Método para obter detalhes de uma série
  getSeriesDetails(seriesId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/${seriesId}`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR' // Adiciona o idioma em português do Brasil
      }
    });
  }

  // Método para buscar o elenco de um filme
  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/credits`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR' // Adiciona o idioma em português do Brasil
      }
    });
  }

  // Método para buscar o elenco de uma série
  getSeriesCredits(seriesId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/${seriesId}/credits`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR' // Adiciona o idioma em português do Brasil
      }
    });
  }

  // Método para obter o trailer de um filme
  getMovieTrailers(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/videos`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR' // Adiciona o idioma em português do Brasil
      }
    });
  }

  // Método para obter trailers de uma série
  getSeriesTrailers(seriesId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/${seriesId}/videos`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR' // Adiciona o idioma em português do Brasil
      }
    });
  }

  // Método para buscar filmes populares
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR', // Para trazer os dados em português
      },
    });
  }

  // Método para buscar séries populares
  getPopularSeries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/popular`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR', // Para trazer os dados em português
      },
    });
  }

  // Método para obter os gêneros de filmes
  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/genre/movie/list`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR' // Adiciona o idioma em português do Brasil
      }
    });
  }

  // Método para obter os gêneros de séries
  getSeriesGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/genre/tv/list`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR' // Adiciona o idioma em português do Brasil
      }
    });
  }
}
