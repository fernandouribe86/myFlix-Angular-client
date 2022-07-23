import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';;
import { Input } from '@angular/core';

/**
 * @module GenreViewComponent
 * Handles the display of the details of Genres for a selected movie
 */

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

    filteredGenres: Array<{
      _id: string, 
      Name: string, 
      Description: string}
      > = [];
  
  /**
   * @param  {FetchApiDataService} fetchApiData pulls in data from myFlix API database
   * @param  {MatDialog} dialog Uses Angular Material to create dialog box that appears when button is clicked
   * @param  {Router} router routes user to a specified URL
   */
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    public router: Router,
    ) {}

  ngOnInit(): void {
    this.getGenres();
  }

/**
 * @function getGenres
 * Gets genres and maps to selected movie from array of genres
 */
  getGenres(): void {
    this.fetchApiData.getGenres().subscribe((resp: any) => {
      this.genres = resp;
      
      // FILTER GENRES FROM GENRE LIST
      var arr = this.genre;
      this.filteredGenres = this.genres.filter(item => arr.includes(item._id));
    })
    }

}


