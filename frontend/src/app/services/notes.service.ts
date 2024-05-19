import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Input, Note } from '../interfaces/note';

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
}
