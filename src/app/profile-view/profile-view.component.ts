import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  
user: any = { _id: '', Username: '', Password: '', Favorites: [], Birthday: '', Email: ''};
movies: any[] = [];
filteredFavorites: Array<{
  _id: string,
  Title: string,
}> = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
    this.fixBirthday();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      //FILTER FAVORITES FROM MOVIES LIST
      var arr = this.user.Favorites;
      this.filteredFavorites = this.movies.filter(item => arr.includes(item._id));
    });
  }

  fixBirthday(): void{
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;

      //FIX BIRTHDAY FORMATTING
      let birthday = new Date(this.user.Birthday).toDateString();
      this.user.Birthday = birthday;
    })
  }

  openEditProfileDialog(Username: string, Email: string): void{
    let ref = this.dialog.open(EditProfileComponent, {
      maxWidth: '400px'
    });
    ref.componentInstance.user.username = Username;
    ref.componentInstance.user.email = Email;
  }

  openDeleteProfileDialog(Username: string): void{
    let ref = this.dialog.open(DeleteProfileComponent, {
      maxWidth: '400px'
    });
    ref.componentInstance.user.username = Username;
  }

  favClick(_id: any): void{
    let url: string = `movies#`+_id;
    this.router.navigateByUrl(url);
  }

}
