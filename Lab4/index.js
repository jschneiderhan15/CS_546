const bands = require('./data/bands');
const connection = require('./config/mongoConnection');
const { ConnectionCheckedInEvent } = require('mongodb');

let pinkFloyd = undefined;

async function main() {
    //Create a band of your choice
    //Log the newly created band
    try{
        const oneDirection = await bands.create("One Direction", ["British", "Pop", "Boy Band"], "http://www.onedirection.com", "Republic", ["Zayn Malik", "Harry Styles", "Niall Horan", "Liam Payne", "Louis Tomlinson" ], 2010);
        console.log(oneDirection);
    } catch (e) {
        console.log(e);
    }
    //Create another band of your choice
    try{
        const fiveSOS = await bands.create("Five Seconds of Summer", ["Pop Rock", "Pop", "Boy Band"], "http://www.fivesos.com", "Republic", ["Luke Hemmings", "Calum Hood", "Ashton Irwin", "Michael Clifford"], 2011);
    } catch (e) {
        console.log(e);
    }
    //Query all bands, and log them all
    try{
        const allBands = await bands.getAll();
        console.log(allBands);
    } catch (e) {
        console.log(e);
    }
    //Create the 3rd band of your choice
    //Log the newly created 3rd band (just that band)
    try{
        const fifthHarmony = await bands.create("Fifth Harmony", ["Girl Group", "Pop"], "http://www.fifthharmony.com", "UMG", ["Camila Cabello", "Lauren Jauregui", "Normani", "Ally Brooke", "Dinah Jane"], 2014);
        console.log(fifthHarmony);
    } catch (e) {
        console.log(e);
    }
    //Rename the first band
    //Log the first band with the updated name
    try{
        const oneDRename = await bands.rename("620bca07058e3c7d1b844902", "One D");
        console.log(oneDRename);
    } catch (e) {
        console.log(e);
    }
    //Remove the second band you created
    try{
        const remove5sos = await bands.remove("620bca22058e3c7d1b844903");
        console.log(remove5sos);
    } catch (e) {
        console.log(e);
    }
    //Query all bands, and log them all
    try{
        const allBands = await bands.getAll();
        console.log(allBands);
    } catch (e) {
        console.log(e);
    }
    //Try to create a band with bad input paramaters to make sure it throws errors
    try{
        const errorBand = await bands.create(1234, ["Pop"], "http:www.beatles.com", "UMG", ["Bob"], 1989);
        console.log(errorBand);
    } catch (e) {
        console.log(e);
    }
    //Try to remove a band that does not exist to make sure it throws errors
    try{
        const errorBand = await bands.remove("507f1f77bcf86cd799430912");
        console.log(errorBand);
    } catch (e) {
        console.log(e);
    }
    //Try to rename a band that does not exist to make sure it throws errors
    try{
        const errorBand = await bands.rename("507f1f77bcf86cd799430912", "Hello World");
        console.log(errorBand);
    } catch (e) {
        console.log(e);
    }
    //Try to rename a band that passes in invalid data for newName to make sure it throws errors
    try{
        const errorBand = await bands.rename("507f1f77bcf86cd799430912", "Fifth Harmony");
        console.log(errorBand);
    } catch (e) {
        console.log(e);
    }
    //Try getting a band by ID that does not exist to make sure it throws errors
    try{
        const getError = await bands.get("507f1f77bcf86cd799430912");
        console.log(getError);
    } catch (e) {
        console.log(e);
    }

    await connection.closeConnection();
    console.log("Finished!");

}

main();