import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  filteredFavorites: Array<{
    _id: string,
    Title: string,
  }> = [];

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  openGenreViewDialog(id: string, genre: Array<string> ): void {
    let ref = this.dialog.open(GenreViewComponent);
      ref.componentInstance.movieId = id;
      ref.componentInstance.genre = genre;
      console.log(id);
      console.log(genre);
  }

  openDirectorViewDialog(id: string, director: Array<string> ): void {
    let ref = this.dialog.open(DirectorViewComponent);
      ref.componentInstance.movieId = id;
      ref.componentInstance.director = director;
      console.log(id);
      console.log(director);
  }

  openDescriptionDialog(description: string ): void {
    let ref = this.dialog.open(MovieDescriptionComponent);
      ref.componentInstance.description = description;
      console.log(description);
  }

  getFavoriteMovies(): void{
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);

      //FILTER FAVORITES FROM MOVIES LIST
      var arr = this.user.Favorites;
      console.log(arr);
      this.filteredFavorites = this.movies.filter(item => arr.includes(item._id));
      console.log(this.filteredFavorites);
    });
  }

  isFavorite(_id: any): boolean{
    return this.filteredFavorites.includes(_id);
  }

  addToFavorites(_id: any): void{
    console.log(_id);
    this.fetchApiData.addFavoriteMovie(_id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  removeFromFavorites(_id: any): void{
    console.log(_id);
    this.fetchApiData.removeFavoriteMovie(_id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

}
