const mongoose = require( 'mongoose' );

const AuthorSchema = new mongoose.Schema({
    authorName : {
        type : String,
        required : true,
        minlength : 3, 
        maxlength : 20
    }


    
}, { timestamps: true });

const Author = mongoose.model( 'authors', AuthorSchema );

const AuthorModel = {
    createAuthor : function( newAuthor ){
        return Author.create( newAuthor );
    },

    getAllAuthors : function( ){
        return Author.find().sort( { created_at: -1 } );
    },

    getAuthorByName : function( authorName ){
        return Author.findOne( {authorName : authorName} );
    },

    getAuthorById : function( id ){
        return Author.findOne( { _id : id } );
    },

    updateAuthor: function( id, authorToUpdate ){
        return Author.findOneAndUpdate( { _id : id },{ $set:authorToUpdate }, { new:true } )
    },

    destroyAuthor : function( id ){
        return Author.deleteOne({ _id : id });
    },

};

module.exports = {AuthorModel};