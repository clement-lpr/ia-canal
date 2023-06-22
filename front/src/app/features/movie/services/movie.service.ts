import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '@core/models';
import { Observable } from 'rxjs';

import { JsonConvert } from 'json2typescript';
import { MovieSearchCriteria } from '../enums';

@Injectable()
export class MovieService {
  constructor(private readonly http: HttpClient) {}

  private baseUrl = 'http://localhost:3000/';

  public getMovies(
    token: string,
    query?: string,
    sortBy?: MovieSearchCriteria | '',
  ): Observable<Movie[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Movie[]>(`${this.baseUrl}movies?query=${query}&sortBy=${sortBy}`, {
      headers,
    });
  }

  public getMovie(id: string, token: string): Observable<Movie> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Movie>(`${this.baseUrl}movies/id=${id}}`, {
      headers,
    });
  }
}
