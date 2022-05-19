const { ObjectID } = require('bson');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const albumData = data.albums;

router.get('/:id', async (req, res) => {
    try{
        if(!ObjectID.isValid(req.params.id)){
            throw "ID is not a valid ID!";
        }
    } catch (e) {
        return res.status(400).json({error: e});
    }
    try{
        let albumArray = await albumData.getAll(req.params.id);
        if(albumArray.length === 0){
            throw "No albums were found for this band!";
        }
        await bandData.get(req.params.id);
        return res.status(200).json(albumArray);
    } catch (e) {
        return res.status(404).json({error: e});
    }
});

router.post('/:id', async (req, res) => {
    const albumPostData = req.body;
    try{
        if(!albumPostData.title){
            throw "You must provide a title for your album!";
        }
        if(!albumPostData.releaseDate){
            throw "You must provide a release date for your album!";
        }
        if(!albumPostData.tracks){
            throw "You must provide a track list for your album!";
        }
        if(!albumPostData.rating){
            throw "You must provide a rating for your album!";
        }
        if(typeof albumPostData.title != 'string'){
            throw "Title must be a string!";
        }
        if(typeof albumPostData.releaseDate != 'string'){
            throw "Release date must be a string!";
        }
        if(albumPostData.title.trim().length === 0){
            throw "Title cannot just be empty spaces!";
        }
        if(albumPostData.releaseDate.trim().length === 0){
            throw "Release date cannot just be empty spaces!";
        }
        //If the band doesn't exist with that BandID, the method should throw
        if(!Array.isArray(albumPostData.tracks)){
            throw "Tracklist must be an array!";
        }
        if(albumPostData.tracks.length < 3){
            throw "Tracklist must be at least 3 songs long!";
        }
        for(i = 0; i < albumPostData.tracks.length; i++){
            if(typeof albumPostData.tracks[i] != 'string'){
                throw "Tracklist must be compromised of strings!";
            }
            if(albumPostData.tracks[i].trim().length === 0){
                throw "Tracklist cannot have songs that are just spaces!";
            }
        }
        if(!Date.parse(albumPostData.releaseDate)){
            throw "Release date must be a valid date!";
        }
        let yearCheck = false;
        let year = 0;
        for(i = 0; i < albumPostData.releaseDate.length; i++){
            if(!yearCheck){
                if(albumPostData.releaseDate[i] === "/"){
                    yearCheck = true;
                }
            }
            else{
                if(albumPostData.releaseDate[i] === "/"){
                    year = parseInt(albumPostData.releaseDate.substring(i + 1));
                }
            }
        }
        if(albumPostData.year < 1900 || albumPostData.year > 2023){
            throw "Release date must be between 1900 and next year!";
        }
        if(typeof albumPostData.rating != 'number'){
            throw "Rating must be a number!";
        }
        if(albumPostData.rating < 1 || albumPostData.rating > 5){
            throw "Rating must be between 1 and 5!";
        }
    } catch (e){
        return res.status(400).json({error: e});
    }
    try{
        if(!ObjectID.isValid(req.params.id)){
            throw "ID is not valid!";
        }
    } catch (e) {
        return res.status(400).json({error: e});
    }
    try{
        await albumData.create(req.params.id, albumPostData.title, albumPostData.releaseDate, albumPostData.tracks, albumPostData.rating);
        let band = await bandData.get(req.params.id);
        return res.status(200).json(band);
    } catch (e) {
        return res.status(404).json(e);
    }
});

router.get('/albums/:id', async (req, res) =>{ 
    try{
        if(!ObjectID.isValid(req.params.id)){
            throw "ID is not a valid ID!";
        }
    } catch (e) {
        return res.status(400).json({error : e});
    }
    try{
        let album = await albumData.get(req.params.id);
        if(album === null){
            throw "Album does not exist!";
        }
        return res.status(200).json(album);
    } catch (e) {
        return res.status(404).json({error : e});
    }
});

router.delete('/albums/:id', async(req, res) =>{
    try{
        if(!ObjectID.isValid(req.params.id)){
            throw "ID is not a valid ID!";
        }
    } catch (e) {
        return res.status(400).json({error: e});
    }
    try{
        let check = await albumData.get(req.params.id);
        if(!check){
            throw "Album not found";
        }
        await albumData.remove(req.params.id);
        return res.json({albumId: req.params.id, deleted: true});
    } catch (e) {
        return res.status(404).json({error: e});
    }
})

module.exports = router;