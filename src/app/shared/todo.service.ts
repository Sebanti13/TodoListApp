import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import ITodo from '../components/todo/todo';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = 'http://127.0.0.1:8081'
  private headers: HttpHeaders = new HttpHeaders()
  constructor(private http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
  }
  getItems(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.todoUrl, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    );
  }
  addItem(item: ITodo) {
    return this.http.post(this.todoUrl, JSON.stringify(item), { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    );
  }
  updateItem(item: ITodo) {
    return this.http.put(this.todoUrl, item, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    );
  }
  deleteItem(item: ITodo) {
    return this.http.delete(`${this.todoUrl}/${item.id}`, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    );
  }
  private errorHandler(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      // client error event
      errorMsg = `An error occurred ${error.error.message}`;
    } else {
      // Unsuccessful response from backend
      errorMsg = `Server returned code ${error.status}, error message is ${error.message} `;
    }
    return throwError(errorMsg);
  }
}
