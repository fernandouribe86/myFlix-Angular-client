import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';;
import { Input } from '@angular/core';

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
  

  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    public router: Router,
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

      this.filteredGenres = this.genres.filter(item => arr.includes(item._id));
    })
    }

}


