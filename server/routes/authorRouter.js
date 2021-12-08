const express = require( 'express' );
const AuthorRouter = express.Router();
const { AuthorsController } = require( '../controllers/authorsController' );

AuthorRouter
    .route( '/' )
    .post( AuthorsController.createAuthor )
    .get( AuthorsController.getAllAuthors );

AuthorRouter
    .route( '/:id' )
    .get( AuthorsController.getOneAuthor )
    .put( AuthorsController.updateAuthor)
    .delete( AuthorsController.deleteAuthor );


module.exports = { AuthorRouter };