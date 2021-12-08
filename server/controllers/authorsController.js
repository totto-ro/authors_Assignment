const {AuthorModel} = require( '../models/authorModel' );

const AuthorsController = {


    getOneAuthor: function (request, response) {
        let id = request.params.id;

        AuthorModel
        .getAuthorById( id )
            .then(data => {
                if( data === null ){
                    throw new Error( "That author doesn't exist" );
                }
                else{
                    AuthorModel
                        .getAuthorById( id )
                        .then( result => {
                            response.status( 200 ).json( result );
                        });
                }
            })
            .catch( error => {
                response.statusMessage = error.message;
                response.status( 404 ).end();
            })
    },

    getAllAuthors : function( request, response ){
        AuthorModel.getAllAuthors()
            .then( authors => {
                let authorsMap = authors.map( author => {
                    // Map through comments here if you need to include comments too
                    return {
                        id : author._id,
                        authorName : author.authorName,
                    }
                } )
                response.status( 200 ).json( authorsMap );
            });
    },
    createAuthor : function( request, response ){
        let { authorName } = request.body;

        if( authorName ){
            let newAuthor = {
                authorName,
            };
            console.log(newAuthor);
            AuthorModel
                .createAuthor( newAuthor)
                .then( author => {
                    response.status( 201 ).json( author );
                })
                .catch(error => {
                    console.log("Error to create author: ", error);
                    response.statusMessage = "The authors name most be at least 3 characters long! Try again!";
                    response.status( 404 ).end();
                }); 
        }
        else{
            response.statusMessage = "You are missing a field to create a new Author";
            response.status( 406 ).end();
        }      
    },

    updateAuthor : function( request, response ){
        if (request.body.authorName.length < 3){
            response.statusMessage =  "The authors name most be at least 3 characters long" ;
            response.status( 406 ).end();
            } 
            else{
                let authorName = request.body.authorName;
                let id = request.params.id;
                let newAuthor = { 
                    authorName 
                };
                AuthorModel
                .updateAuthor(id, newAuthor)
                .then(data => {
                    response.status( 201 ).json( data );
                })
                .catch(error => {
                    response.statusMessage = error.message;
                    response.status( 404 ).end();
                });
            }
        },

    deleteAuthor : function( request, response ){
        AuthorModel
            .destroyAuthor(request.params.id)
            .then(data => {
                response.json(data);
            })
            .catch(error => {
                response.json( "Author does not exist" );
            }); 
    },
    

}

module.exports = {AuthorsController};