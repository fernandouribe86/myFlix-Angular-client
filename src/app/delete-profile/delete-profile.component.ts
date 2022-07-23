import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';

/**
 * @module DeleteProfileComponent
 * Handles the display of the dialog to delete user profile
 */

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent implements OnInit {
  @Input() user: any = {};

  /**
   * @param  {FetchApiDataService} fetchApiData pulls in data from myFlix API database
   * @param  {MatDialog} dialog Uses Angular Material to create dialog box that appears when button is clicked
   * @param  {Router} router routes user to a specified URL
   * @param  {MatSnackBar} snackBar creates alerts using Angular Material
   * @param  {DialogRef} dialogRef handles opening/closing of dialog box
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public dialogRef: DialogRef,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * @function cancel
   * Closes dialog upon click of cancel button
   */
  cancel(): void{
    this.dialogRef.close(); 
  }

  
  /**
   * @function deleteProfile
   * @param this.user
   * Deletes user if request is successful and alert is confirmed
   */
  deleteProfile(): void{
    if (confirm('Are you super sure?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      this.dialogRef.close();
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }
}
