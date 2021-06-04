import { Injectable } from '@angular/core';
import { Villain } from './Villain';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class villainService {

  private villainsUrl = 'http://localhost:3000/api/villains/';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET villains from the server */
  getVillains(): Observable<Villain[]> {
    return this.http.get<Villain[]>(`${this.villainsUrl}`)
      .pipe(
        catchError(this.handleError<Villain[]>('getvillains', []))
      );
  }
  
  /** GET villain by id. Will 404 if id not found */
  getVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`
    return this.http.get<Villain>(url).pipe(
      tap(_ => this.log(`fetched villain id=${id}`)),
      catchError(this.handleError<Villain>(`getvillain id=${id}`))
    );
  }
  
  /** PUT: update the villain on the server */
  updateVillain(villain: Villain): Observable<any> {
    return this.http.put(this.villainsUrl, villain, this.httpOptions).pipe(
      tap(_ => this.log(`updated villain id=${villain.idVillain}`)),
      catchError(this.handleError<any>('updatevillain'))
    );
  }

  /** POST: add a new villain to the server */
  addVillain(villain: Villain): Observable<Villain> {
    return this.http.post<Villain>(this.villainsUrl, villain, this.httpOptions).pipe(
      tap((newvillain: Villain) => this.log(`added villain w/ id=${newvillain.idVillain}`)),
      catchError(this.handleError<Villain>('addvillain'))
    );
  }

  /** DELETE: delete the villain from the server */
  deleteVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;

    return this.http.delete<Villain>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted villain id=${id}`)),
      catchError(this.handleError<Villain>('deletevillain'))
    );
  }

  /* GET villains whose name contains search term */
  searchvillains(term: string): Observable<Villain[]> {
    if (!term.trim()) {
      // if not search term, return empty villain array.
      return of([]);
    }
    return this.http.get<Villain[]>(`${this.villainsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found villains matching "${term}"`) :
        this.log(`no villains matching "${term}"`)),
      catchError(this.handleError<Villain[]>('searchvillains', []))
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a villainService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`villainService: ${message}`);
  }
}
