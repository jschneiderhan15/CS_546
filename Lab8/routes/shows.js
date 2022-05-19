const axios = require('axios');
const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;

router.get('/', async (req, res) => {
    res.render('shows/index', {title: "Show Finder"});
});

router.post('/searchshows', async (req, res) => {
    const searchTerm = req.body.showSearchTerm;
    try{
        if(searchTerm.trim().length === 0){
            res.status(400).render('shows/error', {title: "Error", class: "error", message: "Search term keyword must be a non-empty string."});
            return;
        }
        let returnData = await showData.getShows(searchTerm);
        if(returnData.length === 0){
            res.render('shows/error', {title: "Error", class: "show-not-found", message: "We're sorry, but no results were found for " + searchTerm + "."});
            return;
        }
        else{
            res.render('shows/results', {title: "Shows Found", term: searchTerm, results: returnData});
            return;
        }
    }
    catch (e) {
        res.status(500).json({error: e});
    }
});

router.get('/shows/:id', async(req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status(400).render('shows/error',{title: "Error", class: "error", message: "ID given is not valid!"});
        return;
    }
    if(isNaN(id)){
        res.status(400).render('shows/error', {title: "Error", class:"error" , message:"ID given is not a number!"});
        return;
    }
    try{
        let showStuff = await showData.getShowId(id);
        let lang = "N/A", genres = ["N/A"], avgRate = "N/A", network = "N/A", summary = "N/A", imgSrc = 'https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg';
        if(showStuff.image != null && showStuff.image.medium != null){
            imgSrc = showStuff.image.medium;
        }
        if(showStuff.language != null){
            lang = showStuff.language;
        }
        if(showStuff.genres.length != 0){
            genres = showStuff.genres;
        }
        if(showStuff.rating != null && showStuff.rating.average != null){
            avgRate = showStuff.rating.average;
        }
        if(showStuff.network != null && showStuff.network.name != null){
            network = showStuff.network.name;
        }
        if(showStuff.summary != null){
            summary = showStuff.summary;
        }
        res.render('shows/details', {title: showStuff.name, img: imgSrc, language: lang, genre: genres, network:network, average: avgRate, summary: summary.replace( /(<([^>]+)>)/ig, '')});
    } catch (e) {
        res.status(404).render('shows/error', {title: "Error",class: "error-not-found", message: "No show found for given ID!"});
    }
})

module.exports = router;