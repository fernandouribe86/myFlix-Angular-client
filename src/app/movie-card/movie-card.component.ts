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

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  openGenreViewDialog(id: string, genre: Array<string> ): void {
    let ref = this.dialog.open(GenreViewComponent);
      ref.componentInstance.movieId = id;
      ref.componentInstance.genre = genre;
      console.log(id);
      console.log(genre);
  }

  openDirectorViewDialog(name: string, bio: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio
      },
      width: '500px'
    });

  }

  openDescriptionDialog(description: string ): void {
    let ref = this.dialog.open(MovieDescriptionComponent);
      ref.componentInstance.description = description;
      console.log(description);
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

}
