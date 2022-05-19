const axios = require("axios");

//Returns an array of people objects from people.json
const getPeople = async function getPeople(){
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json");
    return data;
}

//Returns an array of stock objects from stocks.json
const getWork = async function getWork(){
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json");
    return data;
}

//Returns the person for the specified id within the people.json array.
const getPersonById = async function getPersonById(id){
    //error checking
    if(!id){
        throw "Error: ID parameter must exist!";
    }
    let newId = parseInt(id);
    if(!newId){
        throw "Error: ID parameter must be a number!";
    }
    if(id === " "){
        throw "Error: ID parameter cannot just be empty spaces!";
    }
    
    let peopleArray = await getPeople(); //array that holds the people from people.json

    for(x of peopleArray){ //loop through people array
        if(x.id === newId){ //if id in array matches id parameter, return the person object
            return x;
        }
    }

    throw "Error: Person not found"; //if not found in array, throw error
}

//Return the stock data for the specified ID.
const getWorkById = async function getWorkById(id){
    //error checking
    if(!id){
        throw "Error: ID parameter must exist!";
    }
    let newId = parseInt(id);
    if(!newId){
        throw "Error: ID parameter must be a number!";
    }
    if(id === " "){
        throw "Error: ID parameter cannot just be empty spaces!";
    }
    
    let workArray = await getWork(); //array that holds the people from people.json

    for(x of workArray){ //loop through people array
        if(x.id === newId){ //if id in array matches id parameter, return the person object
            return x;
        }
    }

    throw "Error: Company not found"; //if not found in array, throw error
}

module.exports = {
    getPeople,
    getWork,
    getPersonById,
    getWorkById
}