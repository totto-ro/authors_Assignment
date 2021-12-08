import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private _http: HttpClient) { }

  fetchAllAuthors() {
    return this._http.get('http://localhost:7077/authors/');
  }
  getOneAuthor(id: string){
    return this._http.get(`http://localhost:7077/authors/${id}`);
  }
  
  createAuthor(newAuthor: any) {
      return this._http.post('http://localhost:7077/authors/', newAuthor);
  }

  updateAuthor(id : string, editAuthor : any){
    return this._http.put(`http://localhost:7077/authors/${id}`, editAuthor);
  }

  deleteAuthor(id : string){
    return this._http.delete(`http://localhost:7077/authors/${id}`);
  }

}
