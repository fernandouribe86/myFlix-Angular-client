import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

/**
 * @module UserLoginFormComponent
 * Handles the login of an existing user
 */

export class UserLoginFormComponent implements OnInit {

  // Values will be passed through the login form
  @Input() userData = { Username: '', Password: '', Favorites: [] };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

   /**
   * @function loginUser
   * Opens a dialog to login the existing user
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);
      this.router.navigate(['movies']);
      this.dialogRef.close(); 
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
