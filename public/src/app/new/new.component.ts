import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../main/author.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newAuthor: any;
  errorMessage: any;
  
  constructor(  private _authorService: AuthorService,
    private _router:Router,
    private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.newAuthor = {
      authorName : ""
    }
  }


  createAuthor(event: any ): void{
    console.log(this.newAuthor)
    let observable = this._authorService.createAuthor( this.newAuthor);
    observable.subscribe( (data : any) =>{
        console.log("New author: ", data)
        this._router.navigate( ['/'] );
      },
      ( error: any ) => {
        console.log( error );
        this.errorMessage = error.statusText;
      })

  }

}
