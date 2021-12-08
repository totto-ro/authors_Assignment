import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from './author.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  allAuthors : any;

  constructor(  private _authorService: AuthorService,
    private _router:Router,
    private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  getAllAuthors(): void {
    console.log("We are going to fetch the author list!");
    this._authorService.fetchAllAuthors()
    .subscribe( (data:any) => {
      this.allAuthors = data;
      console.log( "From main component: ", this.allAuthors );
    });
  }

  destroyAuthor(id : string){
    let observable = this._authorService.deleteAuthor(id);
    observable.subscribe(
      (data : any) =>{
        console.log(data)
        this.getAllAuthors();
      },
      ( error: any ) => {
        console.log( error );
      }
    )
  }
  
  






}
