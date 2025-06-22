import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.page.html',
  styleUrls: ['./series-detail.page.scss'],
})
export class SeriesDetailPage implements OnInit {
  seriesId!: number;
  series: any;
  seriesGenres: string = '';
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
    this.seriesId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSeriesDetails();
    this.loadSeriesCredits();
    this.loadSeriesTrailers();
    this.loadWatchProviders();
    this.loadSeriesCertification();

    // Carregar dados do Firestore para a série
    this.userService.getUserMediaData(this.seriesId).then((data: any) => {
      if (data) {
        this.isFavorite = data.isFavorite || false;
        this.userRating = data.rating || null;
      }
    });
  }

  loadSeriesDetails() {
    this.tmdbService.getSeriesDetails(this.seriesId).subscribe((response: any) => {
      this.series = response;
      this.seriesGenres = this.series.genres.map((genre: any) => genre.name).join(', ');
    });
  }

  loadSeriesCertification() {
    this.tmdbService.getSeriesCertification(this.seriesId).subscribe((response: any) => {
      const brCertification = response.results.find((cert: any) => cert.iso_3166_1 === 'BR');
      this.certification = brCertification ? brCertification.release_dates[0].certification : 'N/A';
    });
  }

  loadSeriesCredits() {
    this.tmdbService.getSeriesCredits(this.seriesId).subscribe((response: any) => {
      this.cast = response.cast;
    });
  }

  loadSeriesTrailers() {
    this.tmdbService.getSeriesTrailers(this.seriesId).subscribe((response: any) => {
      this.trailers = response.results.filter((video: any) => video.type === 'Trailer');
    });
  }

  loadWatchProviders() {
    this.tmdbService.getSeriesWatchProviders(this.seriesId).subscribe((response: any) => {
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
    this.series.isFavorite = this.isFavorite;

    await this.userService.addMediaToUser(this.series, 'series');
  }

  async rateSeries(rating: 'like' | 'dislike') {
    this.userRating = rating;
    this.series.like = rating === 'like';
    this.series.dislike = rating === 'dislike';

    await this.userService.addMediaToUser(this.series, 'series');
  }
}
