import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://fernando-myflix-3.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

 // Making the api call for the user registration endpoint
     /**
   * @method post
   * @function userRegistration
   * @param userDetails
   * @returns Observable of new user data
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

// Making the api call for the login endpoint
    /**
   * @method post
   * @function userLogin
   * @param Username
   * @returns Observable of user data
   */
public userLogin(userDetails: any): Observable<any>{
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
  )
}

  // Making the api call to get all movies
    /**
   * @method get
   * @function getAllMovies
   * @returns Observable of an array of Movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  // Making the API call to get a single movie from id
    /**
   * @method get
   * @function getSingleMovie
   * @param _id {string}
   * @returns Observable of movie details of a single movie
   */
  getSingleMovie(_id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${_id}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' +token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Making the api call to get array of director(s)
      /**
   * @method get
   * @function getDirector
   * @returns Observable of an array of Directors
   */
  getDirector(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Making the api call to get array of all genre(s)
    /**
   * @method get
   * @function getGenres
   * @returns Observable of an array of Genres
   */
  getGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres', { headers: new HttpHeaders(
      {
          Authorization: 'Bearer ' + token,
        })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Making the api call to get the genres for one genre
    /**
   * @method get
   * @function getSingleMovieGenres
   * @param _id {string}
   * @returns Observable of genre details of a single movie
   */
  getSingleMovieGenres(name: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${name}/Genres/`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Making the api call to get User info
  /**
   * @method get
   * @function getUser
   * @param username {string}
   * @returns Observable of array user object by Username
   */
  getUser(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Making the api call to get list of Favorite movies
  /**
   * @method get
   * @function getFavoriteMovies
   * @param username {string}
   * @returns Observable of array of favorited movies
   */
  getFavoriteMovies(): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}/Favorites`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Making the api call to add a movie to a user's list of favorite movies
  /**
   * @method put
   * @function addFavoriteMovie
   * @param username {string}
   * @param _id {string}
   * @returns Observable of string indicating whether addition was successful
   */
  addFavoriteMovie(_id: string): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/${_id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
    }

  //Making the api call to remove a movie to a user's list of favorite movies
  /**
   * @method delete
   * @function removeFavoriteMovie
   * @param username {string}
   * @param _id {string}
   * @returns Observable of string indicating whether removal was successful
   */
  removeFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${_id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    //Making the api call to update a user's info
      /**
   * @method put
   * @function editUser
   * @param username {string}
   * @returns Observable of new user information
   */
  editUser(updateDetails: any): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log(updateDetails);
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Making the api call to delete a user from the database
  /**
   * @method delete
   * @function deleteUser
   * @param username {string}
   * @returns Observable of string indicating whether delete was successful
   */
  deleteUser(): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

