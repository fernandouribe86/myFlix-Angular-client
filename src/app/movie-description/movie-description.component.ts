import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss']
})
export class MovieDescriptionComponent implements OnInit {

  @Input() description: string = "";

  constructor(
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

}
