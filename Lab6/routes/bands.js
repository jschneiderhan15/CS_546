const { ObjectID } = require('bson');
const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;

router.get('/', async (req, res) => {
    try{
        const bandList = await bandData.getAll();
        res.json(bandList); 
    } catch (e) {
        return res.status(500).json({error: e});
    }
});

router.post('/', async (req, res) => {
    const bandPostData = req.body;
    try{
        if(!bandPostData.name) throw "You must supply a name for the band!";
        if(!bandPostData.genre) throw "You must supply genres for the band!";
        if(!bandPostData.website) throw "You must supply a website for the band!";
        if(!bandPostData.recordLabel) throw "You must supply a record label for the band!";
        if(!bandPostData.bandMembers) throw "You must supply band members for the band!";
        if(!bandPostData.yearFormed) throw "You must supply a year formed for the band!";
        if(typeof bandPostData.name != 'string') throw "Name must be a string!";
        if(typeof bandPostData.website != 'string') throw "Website must be a string!";
        if(typeof bandPostData.recordLabel != 'string') throw "Record label must be a string!";
        if(!bandPostData.website.startsWith("http://www.")){
            throw "Website must start with a \"http://www.\" clause!";
        }
        if(!bandPostData.website.endsWith(".com")){
            throw "Website must end with a \".com\" clause!";
        }
        let startIndex = bandPostData.website.indexOf("http://www.") + "http://www.".length;
        let endIndex = bandPostData.website.length - ".com".length;
        if(bandPostData.website.substring(startIndex, endIndex).length < 5){
            throw "Website must have at least 5 characters between the http and .com!";
        }
        if(!Array.isArray(bandPostData.genre)){
            throw "Genre must be an array!";
        }
        if(!Array.isArray(bandPostData.bandMembers)){
            throw "Band members must be an array!";
        }
        if(bandPostData.genre.length === 0){
            throw "Genre must at least have one element!";
        }
        if(bandPostData.bandMembers.length === 0){
            throw "Band members must have at least one element!";
        }
        let genreEmptyCount, memberEmptyCount = 0;
        for(i = 0; i < bandPostData.genre.length; i++){
            if(typeof bandPostData.genre[i] != 'string'){
                throw "Genre has to only have strings!";
            }
            if(bandPostData.genre[i].trim().length === 0){
                genreEmptyCount++;
            }
        }
        for(i = 0; i < bandPostData.bandMembers.length; i++){
            if(typeof bandPostData.bandMembers[i] != 'string'){
                throw "Band members has to only have strings!";
            }
            if(bandPostData.bandMembers[i].trim().length === 0){
                memberEmptyCount++;
            }
        }
        if(genreEmptyCount === bandPostData.genre.length){
            throw "Genre has to have at least one string that's not just spaces!";
        }
        if(memberEmptyCount === bandPostData.bandMembers.length){
            throw "Band Members has to have at least one string that's not just spaces!";
        }
        if(typeof bandPostData.yearFormed != 'number'){
            throw "Year formed has to be a number!";
        }
        if(bandPostData.yearFormed < 1900 || bandPostData.yearFormed > 2022){
            throw "Year formed has to be within the range 1900-2022!";
        }
        const {name, genre, website, recordLabel, bandMembers, yearFormed} = bandPostData;
        const newBand = await bandData.create(name, genre, website, recordLabel, bandMembers, yearFormed);
        res.status(200).json(newBand);
    } catch (e) {
        return res.status(400).json({error : e});
    }
});

router.get('/:id', async (req, res) => {
    try{
        if(!ObjectID.isValid(req.params.id)) throw "ID not valid!";
    } catch (e) {
        return res.status(400).json({error: e})
    }
    try{
        let band = await bandData.get(req.params.id);
        res.status(200).json(band);
    } catch (e) {
        return res.status(404).json({error: "Band Not Found"});
    }
});

router.put('/:id', async (req, res) => {
    const bandPostData = req.body;
    try{
        if(!ObjectID.isValid(req.params.id)) throw "ID not valid!";
        if(!bandPostData.name) throw "You must supply a name for the band!";
        if(!bandPostData.genre) throw "You must supply genres for the band!";
        if(!bandPostData.website) throw "You must supply a website for the band!";
        if(!bandPostData.recordLabel) throw "You must supply a record label for the band!";
        if(!bandPostData.bandMembers) throw "You must supply band members for the band!";
        if(!bandPostData.yearFormed) throw "You must supply a year formed for the band!";
        if(typeof bandPostData.name != 'string') throw "Name must be a string!";
        if(typeof bandPostData.website != 'string') throw "Website must be a string!";
        if(typeof bandPostData.recordLabel != 'string') throw "Record label must be a string!";
        if(!bandPostData.website.startsWith("http://www.")){
            throw "Website must start with a \"http://www.\" clause!";
        }
        if(!bandPostData.website.endsWith(".com")){
            throw "Website must end with a \".com\" clause!";
        }
        let startIndex = bandPostData.website.indexOf("http://www.") + "http://www.".length;
        let endIndex = bandPostData.website.length - ".com".length;
        if(bandPostData.website.substring(startIndex, endIndex).length < 5){
            throw "Website must have at least 5 characters between the http and .com!";
        }
        if(!Array.isArray(bandPostData.genre)){
            throw "Genre must be an array!";
        }
        if(!Array.isArray(bandPostData.bandMembers)){
            throw "Band members must be an array!";
        }
        if(bandPostData.genre.length === 0){
            throw "Genre must at least have one element!";
        }
        if(bandPostData.bandMembers.length === 0){
            throw "Band members must have at least one element!";
        }
        let genreEmptyCount, memberEmptyCount = 0;
        for(i = 0; i < bandPostData.genre.length; i++){
            if(typeof bandPostData.genre[i] != 'string'){
                throw "Genre has to only have strings!";
            }
            if(bandPostData.genre[i].trim().length === 0){
                genreEmptyCount++;
            }
        }
        for(i = 0; i < bandPostData.bandMembers.length; i++){
            if(typeof bandPostData.bandMembers[i] != 'string'){
                throw "Band members has to only have strings!";
            }
            if(bandPostData.bandMembers[i].trim().length === 0){
                memberEmptyCount++;
            }
        }
        if(genreEmptyCount === bandPostData.genre.length){
            throw "Genre has to have at least one string that's not just spaces!";
        }
        if(memberEmptyCount === bandPostData.bandMembers.length){
            throw "Band Members has to have at least one string that's not just spaces!";
        }
        if(typeof bandPostData.yearFormed != 'number'){
            throw "Year formed has to be a number!";
        }
        if(bandPostData.yearFormed < 1900 || bandPostData.yearFormed > 2022){
            throw "Year formed has to be within the range 1900-2022!";
        }
    } catch (e) {
        return res.status(400).json({error: e})
    }
    try{
        let band = await bandData.get(req.params.id);
    } catch (e) {
        return res.status(404).json({error: "Band Not Found"});
    }
    try{
        const updateData = await bandData.update(req.params.id, bandPostData.name, bandPostData.genre, bandPostData.website, bandPostData.recordLabel, bandPostData.bandMembers, bandPostData.yearFormed);
        res.status(200).json(updateData);
    } catch (e) {
        return res.status(400).json({error: e});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        if(!ObjectID.isValid(req.params.id)){
            throw "Object ID is not valid!";
        }
    } catch (e) {
        return res.status(400).json({error: e});
    }
    try{
        let band = await bandData.get(req.params.id);
    } catch (e) {
        return res.status(404).json({error: "Band Not Found"});
    }
    try{
        await bandData.remove(req.params.id);
        res.json({bandId: req.params.id, deleted: true});
    } catch (e) {
        return res.status(500).send("Internal Server Error");
    }
});


module.exports = router;