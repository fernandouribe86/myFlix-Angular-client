import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { filter, subscribeOn } from 'rxjs';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { GenericListener } from 'mongodb';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})

export class GenreViewComponent implements OnInit {

  @Input() movieId: string = "";
  @Input() genre: Array<string> =[];
  @Input() genres: 
    Array<{
      _id: string, 
      Name: string, 
      Description: string}
      >=[];
  @Input() filteredGenres: 
    Array<{
      _id: string, 
      Name: string, 
      Description: string}
      >=[];

  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    public router: Router
    ) {}

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.fetchApiData.getGenres().subscribe((resp: any) => {
      this.genres = resp;
      console.log(this.genres);

      // FILTER GENRES FROM GENRE LIST
      var arr = this.genre;
      console.log(arr);
      var brr = this.genres;
      console.log(brr);
      var filteredGenres = brr.filter(item => arr.includes(item._id));
      console.log(filteredGenres);

      // NEED HELP HERE TO EXPORT JUST THE FILTERED GENRES TO THE HTML PAGE
      
      return this.genres;
    })
    }

}


