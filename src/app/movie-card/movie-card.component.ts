import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';

/**
 * @module MovieCardComponent
 * Handles the display of all movies on the page
 * Displays details that can be clicked on to access details
 * First page when logged in
 */

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

  /**
   * 
   * @param fetchApiData pulls in data from myFlix API database
   * @param dialog Uses Angular Material to create dialog box that appears when button is clicked
   */
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog) 
    { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  
  }
  /**
   * @function openGenreViewDialog
   * @param  {string} id
   * @param  {Array<string>} genre
   * Passes movie ID and genre info while opening Genre dialog 
   */
  openGenreViewDialog(id: string, genre: Array<string> ): void {
    let ref = this.dialog.open(GenreViewComponent);
      ref.componentInstance.movieId = id;
      ref.componentInstance.genre = genre;
      console.log(id);
      console.log(genre);
  }
  /**
   * @function openDirectorViewDialog
   * @param  {string} id
   * @param  {Array<string>} director
   * Passes movie ID and director info while opening Director dialog
   */
  openDirectorViewDialog(id: string, director: Array<string> ): void {
    let ref = this.dialog.open(DirectorViewComponent);
      ref.componentInstance.movieId = id;
      ref.componentInstance.director = director;
      console.log(id);
      console.log(director);
  }
  /**
   * @function openDescriptionDialog
   * @param  {string} description
   * Passes movie description while opening Description dialog
   */
  openDescriptionDialog(description: string ): void {
    let ref = this.dialog.open(MovieDescriptionComponent);
      ref.componentInstance.description = description;
      console.log(description);
  }
  /**
   * @function getFavoriteMovies
   * Gets Favorites from user data
   * Filters favorites from the movie list
   */
  getFavoriteMovies(): void{
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      //FILTER FAVORITES FROM MOVIES LIST
      var arr = this.user.Favorites;
      this.filteredFavorites = this.movies.filter(item => arr.includes(item._id));
    });
  }
  /**
   * @function isFavorite
   * @param  {any} _id
   * Checks to see if movie is in user's favorites list for Heart button
   */
  isFavorite(_id: any): boolean{
    return this.user.Favorites.includes(_id);
  }

  /**
   * @function addToFavorites
   * @param {any}_id 
   * Adds a movie to list of favorites upon clicking unfilled heart button
   */
  addToFavorites(_id: any): void{
    this.fetchApiData.addFavoriteMovie(_id).subscribe((result) => {
      this.ngOnInit();
    })
  }

/**
   * @function removeFromFavorites
   * @param {any}_id 
   * Removes a movie to list of favorites upon clicking filled heart button
   */
  removeFromFavorites(_id: any): void{
    this.fetchApiData.removeFavoriteMovie(_id).subscribe((result) => {
      this.ngOnInit();
    })
  }

  /**
   * @method get
   * @function getMovies
   * Gets list of movies to be used for mapping Favorites
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

}
