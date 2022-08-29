import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private taskurl = 'api/tasks'; //URL for web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // get tasks from mock server
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskurl)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }


  getTask(id: number): Observable<Task> {
    const url = `${this.taskurl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  // update task on mock server
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.taskurl, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  // adds a new task to the server
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskurl, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  // deletes a task from the server
deleteTask(id: number): Observable<Task> {
  const url = `${this.taskurl}/${id}`;

  return this.http.delete<Task>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted task id=${id}`)),
    catchError(this.handleError<Task>('deleteTask'))
  );
}

  /*
 * Handle Http operation that failed.
 * Let the app continue.
 *
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

  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }
}
