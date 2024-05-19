import { Injectable } from '@angular/core';
import { Input, Note } from '../interfaces/note';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private baseUrl = 'http://localhost:3000/api/notes';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  createNote(data: Input): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, data);
  }
}
