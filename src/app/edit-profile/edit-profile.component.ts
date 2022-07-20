import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {
  @Input() user: any = {};

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
