const axios = require("axios");

//Returns an array of people objects from people.json
const getPeople = async function getPeople(){
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json");
    return data;
}

//Returns an array of stock objects from stocks.json
const getStocks = async function getStocks(){
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json");
    return data;
}

//Returns stock data and shareholders (by first and last name) of the given stockName.
const listShareholders = async function listShareholders(stockName){
    //error checking
    if(!stockName){
        throw "Error: Stock name must exist!";
    }
    if(typeof stockName != 'string'){
        throw "Error: Stock name must be a string!";
    }
    //checking for names that are purely spaces
    let spaceCount = 0;
    for(i = 0; i < stockName.length; i++){
        if(stockName[i] === " "){
            spaceCount++;
        }
    }
    if(spaceCount === stockName.length){
        throw "Error: Stock name cannot just be spaces!";
    }
    //creating arrays for both people and stocks
    let peopleArray = await getPeople();
    let stockArray = await getStocks();
    let returnObject = {id: '', stock_name: '', shareholders: ''};
    let shareholderArray = [];
    let nameExists = false;
    //looping through all the stocks
    for(x of stockArray){
        //if the name of the stock is equal to the parameter
        if(x.stock_name === stockName){
            nameExists = true;
            returnObject.id = x.id;
            returnObject.stock_name = stockName;
            //looping through the shareholders of this given stock
            for(share of x.shareholders){
                //looping through the people array
                for(person of peopleArray){
                    //once person is found with matching ID, add person to the shareholder array and break out of this loop
                    if(person.id === share.userId){
                        let addedUser = {first_name: person.first_name, last_name: person.last_name, number_of_shares: share.number_of_shares};
                        shareholderArray.push(addedUser);
                        break;
                    }
                }
            }
            break;
        }
    }
    //add set the return object's shareholders as the array created in the previous loops
    returnObject.shareholders = shareholderArray;
    //if the name doesn't exist, throw an error
    if(!nameExists){
        throw "Error: This stock name doesn't exist!";
    }
    return returnObject;
}

//Returns how many shareholders company has, along with how many total shares are owned.
const totalShares = async function totalShares(stockName){
    //error checking
    if(!stockName){
        throw "Error: Stock name must exist!";
    }
    if(typeof stockName != 'string'){
        throw "Error: Stock name must be of type string!";
    }
    //checking for names that are purely spaces
    let spaceCount = 0;
    for(i = 0; i < stockName.length; i++){
        if(stockName === " "){
            spaceCount++;
        }
    }
    if(spaceCount === stockName.length){
        throw "Error: Stock name cannot just be spaces!";
    }
    //creating stock array and initializing variables
    let stockArray = await getStocks();
    let nameExists = false;
    let shareCount = 0;
    let holderCount = 0;
    //looping through the stock array
    for(x of stockArray){
        //if the stock name is found
        if(x.stock_name === stockName){
            nameExists = true; //mark the name as existing
            //loop through the shareholders of the given stock, adding to holder count and share count
            for(shares of x.shareholders){
                holderCount++;
                shareCount += shares.number_of_shares;
            }
            break;
        }
    }
    //returning various different strings based on the number of holders (to make sentences grammatically correct)
    if(!nameExists){
        throw "Error: This stock name doesn't exist!"
    }
    if(holderCount === 0){
        return stockName + " currently has no shareholders.";
    }
    else if(holderCount === 1){
        return stockName + ", has " + holderCount + " shareholder that owns a total of " + shareCount + " shares.";
    }
    else if(holderCount > 1){
        return stockName + ", has " + holderCount + " shareholders that own a total of " + shareCount + " shares.";
    }
}

//Return ID, number of company stocks owned, and number of shares for each for given name.
const listStocks = async function listStocks(firstName, lastName){
    //error checking
    if(!firstName || !lastName){
        throw "Error: Both parameters must exist!";
    }
    if(typeof firstName != 'string' || typeof lastName != 'string'){
        throw "Error: Both parameters must be strings!";
    }
    //checking for parameters that are purely spaces
    let firstSpaces = 0, lastSpaces = 0;
    for(i = 0; i < firstName.length; i++){
        if(firstName[i] === " "){
            firstSpaces++;
        }
    }
    for(i = 0; i < lastName.length; i++){
        if(lastName[i] === " "){
            lastSpaces++;
        }
    }
    if(firstSpaces === firstName.length || lastSpaces === lastName.length){
        throw "Error: Neither parameter can be purely spaces!";
    }
    //creating people and stock arrays
    let peopleArray = await getPeople();
    let stockArray = await getStocks();
    let nameExists = false;
    let returnArray = [];
    //looping through people arrays
    for(x of peopleArray){
        //if the first and last name match
        if(x.first_name === firstName && x.last_name === lastName){
            nameExists = true;
            //loop through the stocks
            for(stock of stockArray){
                //loop through the shareholders of this given stock
                for(share of stock.shareholders){
                    //if the id of the shareholder matches the id of the given name, add object to return array
                    if(share.userId === x.id){
                        let stockObject = {stock_name: '', number_of_shares: ''};
                        stockObject.stock_name = stock.stock_name;
                        stockObject.number_of_shares = share.number_of_shares;
                        returnArray.push(stockObject);
                    }
                }
            }
            break;
        }
    }
    //throw error if the name is never found
    if(!nameExists){
        throw "Error: This name doesn't exist in the data!";
    }
    return returnArray;
}

//Return the stock data for the specified ID.
const getStockById = async function getStockById(id){
    //error checking
    if(!id){
        throw "Error: ID parameter must exist!";
    }
    if(typeof id != 'string'){
        throw "Error: ID parameter must be a string!";
    }
    let stockArray = await getStocks();
    for(x of stockArray){
        if(id === x.id){
            return x;
        }
    }

    throw "Error: Stock not found";
}

module.exports = {
    listShareholders,
    totalShares,
    listStocks,
    getStockById
}