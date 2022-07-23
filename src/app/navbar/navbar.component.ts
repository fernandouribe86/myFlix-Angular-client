import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @module NavbarComponent
 * Handles the display of the navbar
 */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    ) { }

  ngOnInit(): void {
  }

  /**
   * @function goToMovies
   * Navigate to URL /movies
   */
  goToMovies(): void{
    this.router.navigate(['movies']);
  }

  /**
   * @function goToProfile
   * Navigate to URL /profile
   */
  goToProfile(): void{
    this.router.navigate(['profile'])
  }

/**
   * @function logout
   * Logs out user by clearing localstorage and navigating to welcome screen
   */
  logout(): void{
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
