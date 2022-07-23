import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @module WelcomePageComponent
 * Welcome page greets user and gives ability to login or create account
 */

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * @function openUserRegistrationDialog
   * Clicking opens the user registration dialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent);
  }

    /**
   * @function openUserLoginDialog
   * Clicking opens the existing user login dialog
   */
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent);
  }

}
