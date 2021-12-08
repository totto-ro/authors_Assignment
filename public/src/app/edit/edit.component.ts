import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../main/author.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  currentAuthor: any;
  AuthorByID: any;
  errorMessage: any;
  id : any;

  constructor(  private _authorService: AuthorService,
    private _router:Router,
    private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getAuthor(this.id);
    this.currentAuthor = {
      authorName : ""
    };
  }

getAuthor( id:string ): void{
  let observable = this._authorService.getOneAuthor( id );
  
  observable.subscribe( (data:any) =>{
    this.AuthorByID = data;
    console.log("One result By ID: ", this.AuthorByID)
  },
  ( error: any ) => {
    console.log( error );
    this.errorMessage = error.statusText;
  });
}

  
  editAuthor(event: any ): void{
    console.log("Changing author name to: ", this.currentAuthor)
    let observable = this._authorService.updateAuthor(this.id, this.currentAuthor);
    console.log("Author to edit: ", this.id)
    observable.subscribe( (data : any) =>{
        console.log("Edit current author: ", data)
        this._router.navigate( ['/'] );
      },
      ( error: any ) => {
        console.log( error );
        this.errorMessage = error.statusText;
      })

  }

}
