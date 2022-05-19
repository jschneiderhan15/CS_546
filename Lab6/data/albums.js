const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { objectId, ObjectId, MongoMissingCredentialsError } = require('mongodb');
const { ObjectID } = require('bson');

module.exports = {

    //Returns newly created album object with all properties listed in the parameters.
    async create(bandId, title, releaseDate, tracks, rating){
        if(!bandId){
            throw "You must provide a band ID for your album!";
        }
        if(!title){
            throw "You must provide a title for your album!";
        }
        if(!releaseDate){
            throw "You must provide a release date for your album!";
        }
        if(!tracks){
            throw "You must provide a track list for your album!";
        }
        if(!rating){
            throw "You must provide a rating for your album!";
        }
        if(typeof bandId != 'string'){
            throw "Band ID must be a string!";
        }
        if(typeof title != 'string'){
            throw "Title must be a string!";
        }
        if(typeof releaseDate != 'string'){
            throw "Release date must be a string!";
        }
        if(bandId.trim().length === 0){
            throw "BandID cannot just be empty spaces!";
        }
        if(title.trim().length === 0){
            throw "Title cannot just be empty spaces!";
        }
        if(releaseDate.trim().length === 0){
            throw "Release date cannot just be empty spaces!";
        }
        if(!ObjectID.isValid(bandId)){
            throw "BandID must be a valid ID!";
        }
        //If the band doesn't exist with that BandID, the method should throw
        if(!Array.isArray(tracks)){
            throw "Tracklist must be an array!";
        }
        if(tracks.length < 3){
            throw "Tracklist must be at least 3 songs long!";
        }
        for(i = 0; i < tracks.length; i++){
            if(typeof tracks[i] != 'string'){
                throw "Tracklist must be compromised of strings!";
            }
            if(tracks[i].trim().length === 0){
                throw "Tracklist cannot have songs that are just spaces!";
            }
        }
        if(!Date.parse(releaseDate)){
            throw "Release date must be a valid date!";
        }
        let yearCheck = false;
        let year = 0;
        for(i = 0; i < releaseDate.length; i++){
            if(!yearCheck){
                if(releaseDate[i] === "/"){
                    yearCheck = true;
                }
            }
            else{
                if(releaseDate[i] === "/"){
                    year = parseInt(releaseDate.substring(i + 1));
                }
            }
        }
        if(year < 1900 || year > 2023){
            throw "Release date must be between 1900 and next year!";
        }
        if(typeof rating != 'number'){
            throw "Rating must be a number!";
        }
        if(rating < 1 || rating > 5){
            throw "Rating must be between 1 and 5!";
        }
        let newRating = Math.round(rating * 10) / 10;
        const bandCollection = await bands();

        let newAlbum = {
            _id: ObjectID(),
            title: title,
            releaseDate: releaseDate,
            tracks: tracks,
            rating: newRating,
        }
        bandCollection.updateOne({_id: ObjectId(bandId)},
        {
            $push: {
                albums: newAlbum
            }
        })

        //make sure album id is a string
        return await newAlbum;
    },

    //Returns all albums by the given band ID.
    async getAll(bandId){
        if(!bandId){
            throw "Band ID must be provided!";
        }
        if(typeof bandId != 'string'){
            throw "Band ID must be a string!";
        }
        if(bandId.trim().length === 0){
            throw "Band ID cannot just be empty spaces!";
        }
        if(!ObjectId.isValid(bandId)){
            throw "Band ID is not a valid ID!";
        }
        const bandCollection = await bands();

        const band = await bandCollection.findOne({_id: ObjectId(bandId)});

        if(!band){
            throw "Band not found!";
        }
        
        const albumArray = band.albums;

        for(x of albumArray){
            x._id = x._id.toString();
        }
        return albumArray;
    },

    //Returns album that correlates to the given album ID.
    async get(albumId){
        if(!albumId){
            throw "Album ID must be provided!";
        }
        if(typeof albumId != 'string'){
            throw "Album ID must be a string!";
        }
        if(albumId.trim().length === 0){
            throw "Album cannot just be empty spaces!";
        }
        if(!ObjectID.isValid(albumId)){
            throw "Album ID is not a valid ID!";
        }
        const bandCollection = await bands();
        const album = bandCollection.findOne({"albums._id": ObjectId(albumId)}, {projection: {_id: 0, "albums.$": 1}});
        if(!album){
            throw "Album not found";
        }
        //album._id = album._id.toString();
        return album;
    },

    //Removes an album from the band database and then returns the band object that album belonged to.
    async remove(albumId){
        if(!albumId){
            throw "Album ID must be provided!";
        }
        if(typeof albumId != 'string'){
            throw "Album ID must be a string!";
        }
        if(albumId.trim().length === 0){
            throw "Album ID cannot just be empty spaces!";
        }
        if(!ObjectId.isValid(albumId)){
            throw "Album ID is not a valid ID!";
        }
        
        const bandCollection = await bands();
        const band = bandCollection.updateOne({'albums._id': ObjectId(albumId)}, {$pull: {albums: {_id: ObjectId(albumId)}}});
        if(!band){
            throw "Album ID not found!";
        }
        const newBand = bandCollection.findOne({"albums._id:": ObjectId(albumId)});
        if(!newBand){
            throw "Album ID not found!";
        }
        return newBand;
    }
    
}