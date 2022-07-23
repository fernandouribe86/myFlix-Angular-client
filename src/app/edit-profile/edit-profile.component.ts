import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';

/**
 * @module EditProfileComponent
 * Handles the display of the dialog to edit profile information
 */


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {
  @Input() user: any = {};
  
  /**
   * @param  {FetchApiDataService} fetchApiData pulls in data from myFlix API database
   * @param  {MatDialog} dialog Uses Angular Material to create dialog box that appears when button is clicked
   * @param  {Router} router routes user to a specified URL
   * @param  {MatSnackBar} snackBar creates alerts using Angular Material
   * @param  {DialogRef} dialogRef handles opening/closing of dialog box
   */
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: DialogRef
  ) { }

  ngOnInit(): void {
    this.user.Username = localStorage.getItem("user");
  }

  /**
   * @function editUser
   * @param this.user
   * Handles editing user information and logs out when successful
   */
  editUser(): void{
    this.fetchApiData.editUser(this.user).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open('Successfully updated profile!', 'OK', {
        duration: 2000
      });
      if (this.user.Username || this.user.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Please login again with your new credentials', 'OK', {
          duration: 5000
        });
      };
      return result;
    })
    }
  
}
