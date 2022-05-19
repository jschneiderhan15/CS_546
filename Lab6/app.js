const express = require('express');
const app = express();
const configRoutes = require('./routes');
const bands = require('./data/bands');
const albums = require('./data/albums');
const connection = require('./config/mongoConnection');
const { ConnectionCheckedInEvent } = require('mongodb');
/*
async function main(){
    /*try{
        const oneDirection = await bands.create("One Direction", ["British", "Pop", "Boy Band"], "http://www.onedirection.com", "Republic", ["Zayn Malik", "Harry Styles", "Niall Horan", "Liam Payne", "Louis Tomlinson"], 2010);
        console.log(oneDirection);
    } catch (e) {
        console.log(e);
    }
    
    try{
        const fiveSOS = await bands.create("Five Seconds of Summer", ["Pop Rock", "Pop", "Boy Band"], "http://www.fivesos.com", "Republic", ["Luke Hemmings", "Calum Hood", "Ashton Irwin", "Michael Clifford"], 2011);
        console.log(fiveSOS);
    } catch (e) {
        console.log(e);
    }
    
    try{
        const allBands = await bands.getAll();
        console.log(allBands);
    } catch (e) {
        console.log(e);
    } 

    try{
        const allBands = await bands.get("62215abde117c48e64f13e6b");
        console.log(allBands);
    } catch (e) {
        console.log(e);
    } 
    try{
        const remove5sos = await bands.remove("6221600fceb7e1856e33b01b");
        console.log(remove5sos);
    } catch (e) {
        console.log(e);
    } 

    try{
        const updateoneD = await bands.update("62216298288a4518f24eb973", "Disbanded", ["Yes", "No", "Maybe"], "http://www.aaaaaaa.com", "Universal", ["No", "No", "Yes"], 2001);
        console.log(updateoneD);
    } catch (e) {
        console.log(e);
    } 
    
    try{
        const albumOne = await albums.create("62238e6ddb0f1876cc3453dd", "Album Three", "09/12/2000", ["A", "B", "C", "D"], 5)
        console.log(albumOne);
    } catch (e) {
        console.log(e);
    } 
    try{
        const getAlbums = await albums.getAll("62238e6ddb0f1876cc3453dd");
        console.log(getAlbums);
    } catch (e) {
        console.log(e);
    } 
    try{
        const getAlbumSingular = await albums.get("6223dc99de0527d19c5b966d");
        console.log(getAlbumSingular);
    } catch (e) {
        console.log(e);
    } 
    try{
        const removeAlbum = await albums.remove("62238f0df3004c5269a0a65c");
        console.log(removeAlbum);
    } catch (e) {
        console.log(e);
    } 
    try {
        await connection.closeConnection();
    } catch (e){
        console.log(e);
    }
    console.log("Finished!"); 

    
} 

main(); */

app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
    console.log("Your server is up and running!");
    console.log("Your routes will be running on http://localhost:3000");
}); 