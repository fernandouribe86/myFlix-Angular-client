import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';;
import { Input } from '@angular/core';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  @Input() movieId: string = "";
  @Input() director: Array<string> =[];
  @Input() directors: 
    Array<{
      _id: string, 
      Name: string, 
      Bio: string,
      Birth: string,
      Death: string,}
      >=[];

    filteredDirectors: Array<{
      _id: string, 
      Name: string, 
      Bio: string,
      Birth: string,
      Death: string,}
      > = [];

  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getDirector();
  }

  getDirector(): void {
    this.fetchApiData.getDirector().subscribe((resp: any) => {
      this.directors = resp;

      // FILTER DIRECTOR FROM DIRECTORS LIST
      var arr = this.director;

      this.filteredDirectors = this.directors.filter(item => arr.includes(item._id));
    })
    }
}
