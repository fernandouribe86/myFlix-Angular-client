import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  
user: any = { _id: '', Username: '', Password: '', Favorites: [], Birthday: Date, Email: ''};
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
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);

      //FILTER FAVORITES FROM MOVIES LIST
      var arr = this.user.Favorites;
      console.log(arr);
      this.filteredFavorites = this.movies.filter(item => arr.includes(item._id));
      console.log(this.filteredFavorites);
    });
  }

  openEditProfileDialog(Username: string, Email: string): void{
    let ref = this.dialog.open(EditProfileComponent, {
      maxWidth: '400px'
    });
    ref.componentInstance.user.username = Username;
    ref.componentInstance.user.email = Email;
    console.log(Username);
    console.log(Email);
  }

  openDeleteProfileDialog(Username: string): void{
    let ref = this.dialog.open(DeleteProfileComponent, {
      maxWidth: '400px'
    });
    ref.componentInstance.user.username = Username;
    console.log(Username);
  }

  favClick(): void{
    this.router.navigate(['movies/#{thismovie._id}']);
  }

}
