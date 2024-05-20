import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Input, Note } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private baseUrl = 'http://localhost:3000/api/notes';
  private refreshNotesSubject = new Subject<void>();

  refreshNotes$ = this.refreshNotesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  createNote(data: Input): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, data).pipe(
      tap(() => {
        this.refreshNotesSubject.next();
      })
    );
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/${note._id}`, note).pipe(
      tap(() => {
        this.refreshNotesSubject.next();
      })
    );
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.refreshNotesSubject.next();
      })
    );
  }
}
