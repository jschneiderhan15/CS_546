const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { objectId, ObjectId } = require('mongodb');

module.exports = {

    //Returns newly created band object with all properties listed in the parameters.
    async create(name, genre, website, recordLabel, bandMembers, yearFormed){
        if(!name){
            throw "You must provide a name for your band!";
        }
        if(!genre){
            throw "You must provide a genre for your band!";
        }
        if(!website){
            throw "You must provide a website for your band!";
        }
        if(!recordLabel){
            throw "You must provide a record label for your band!";
        }
        if(!bandMembers){
            throw "You must provide band members for your band!";
        }
        if(!yearFormed){
            throw "You must provide the year formed for your band!";
        }
        if(typeof name != 'string'){
            throw "Name must be a string!";
        }
        if(typeof website != 'string'){
            throw "Website must be a string!";
        }
        if(typeof recordLabel != 'string'){
            throw "Record label must be a string!";
        }
        if(name.trim().length === 0){
            throw "Name cannot be empty or just spaces!";
        }
        if(website.trim().length === 0){
            throw "Website cannot be empty or just spaces!";
        }
        if(recordLabel.trim().length === 0){
            throw "Record label cannot be empty or just spaces!";
        }
        if(!website.startsWith("http://www.")){
            throw "Website must start with a \"http://www.\" clause!";
        }
        if(!website.endsWith(".com")){
            throw "Website must end with a \".com\" clause!";
        }
        let startIndex = website.indexOf("http://www.") + "http://www.".length;
        let endIndex = website.length - ".com".length;
        if(website.substring(startIndex, endIndex).length < 5){
            throw "Website must have at least 5 characters between the http and .com!";
        }
        if(!Array.isArray(genre)){
            throw "Genre must be an array!";
        }
        if(!Array.isArray(bandMembers)){
            throw "Band members must be an array!";
        }
        if(genre.length === 0){
            throw "Genre must at least have one element!";
        }
        if(bandMembers.length === 0){
            throw "Band members must have at least one element!";
        }
        let genreStringCount, genreEmptyCount, memberStringCount, memberEmptyCount = 0;
        for(i = 0; i < genre.length; i++){
            if(typeof genre[i] != 'string'){
                throw "Genre has to only have strings!";
            }
            if(genre[i].trim().length === 0){
                genreEmptyCount++;
            }
        }
        for(i = 0; i < bandMembers.length; i++){
            if(typeof bandMembers[i] != 'string'){
                throw "Band members has to only have strings!";
            }
            if(bandMembers[i].trim().length === 0){
                memberEmptyCount++;
            }
        }
        if(genreEmptyCount === genre.length){
            throw "Genre has to have at least one string that's not just spaces!";
        }
        if(memberEmptyCount === bandMembers.length){
            throw "Band Members has to have at least one string that's not just spaces!";
        }
        if(typeof yearFormed != 'number'){
            throw "Year formed has to be a number!";
        }
        if(yearFormed < 1900 || yearFormed > 2022){
            throw "Year formed has to be within the range 1900-2022!";
        }

        const bandCollection = await bands();

        let newBand = {
            name: name,
            genre: genre,
            website: website,
            recordLabel: recordLabel,
            bandMembers: bandMembers,
            yearFormed: yearFormed
        }

        const insertInfo = await bandCollection.insertOne(newBand);
        if(!insertInfo.acknowledged || !insertInfo.insertedId){
            throw "Could not add band!";
        }
        const newId = insertInfo.insertedId.toString();
        const band = await this.get(newId);
        band._id = newId.toString();
        return band;
    },

    //Returns an array of all bands in the collections.
    //If no bands, this function returns an empty array.
    async getAll(){
        const bandCollection = await bands();
        const bandList = await bandCollection.find({}).toArray();
        if (!bandList){
            throw "Could not retrieve all bands.";
        }
        if(bandList.length === 0){
            return [];
        }
        for(x of bandList){
            x._id = x._id.toString();
        }
        return bandList;
    },

    //Given an ID, returns a band from the database.
    async get(id){
        if(!id){
            throw "ID is required!";
        }
        if(typeof id != 'string'){
            throw "ID must be a string!";
        }
        if(id.trim().length === 0){
            throw "ID cannot just be empty spaces!";
        }
        if(!ObjectId.isValid(id)){
            throw "ID is not a valid object ID!";
        }
        const bandCollection = await bands();
        const band = await bandCollection.findOne({_id: ObjectId(id)});
        if(band === null){
            throw "No band with that ID.";
        }
        band._id = band._id.toString();
        return band;
    },

    //Removes a band from the database.
    async remove(id){
        if(!id){
            throw "ID must exist!";
        }
        if(typeof id != 'string'){
            throw "ID must be a string!";
        }
        if(id.trim().length === 0){
            throw "ID cannot be an empty string or just spaces!";
        }
        if(!ObjectId.isValid(id)){
            throw "ID is not a valid object ID!";
        }
        const bandCollection = await bands();
        const deleteInfo = await bandCollection.deleteOne({_id: ObjectId(id)});

        if(deleteInfo.deletedCount === 0){
            throw "Could not delete band with id of " + id;
        }
        return {
            deleted : true
        };
    },

    //Updates the name of the band currently in the database.
    async rename(id, newName){
        if(!id){
            throw "ID must exist!";
        }
        if(typeof id != 'string'){
            throw "ID must be a string!";
        }
        if(id.trim().length === 0){
            throw "ID cannot be an empty string or just spaces!";
        }
        if(!ObjectId.isValid(id)){
            throw "ID is not a valid object ID!";
        }
        if(!newName){
            throw "New name for band must be provided!";
        }
        if(typeof newName != 'string'){
            throw "New name for band must be a string!";
        }
        if(newName.trim().length === 0){
            throw "New name cannot be an empty string or just spaces!";
        }
        const band = await this.get(id);
        if(band.name === newName){
            throw "New name cannot be the same as the current name!";
        }
        const bandCollection = await bands();
        const updateBand = {
            name: newName
        };

        const updateInfo = await bandCollection.updateOne(
            {_id: ObjectId(id) },
            { $set: updateBand }
        );
        
        if(updateInfo.modifiedCount === 0){
            throw "Could not update band successfully!";
        }
        band._id = band._id.toString();

        return band;
    }
}