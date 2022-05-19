const axios = require("axios");

//Returns an array of people objects from people.json
const getPeople = async function getPeople(){
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json");
    return data;
}

//Returns the person for the specified id within the people.json array.
const getPersonById = async function getPersonById(id){
    //error checking
    if(!id){
        throw "Error: ID parameter must exist!";
    }
    if(typeof id != 'string'){
        throw "Error: ID parameter must be of type string!";
    }
    if(id === " "){
        throw "Error: ID parameter cannot just be empty spaces!";
    }
    
    let peopleArray = await getPeople(); //array that holds the people from people.json

    for(x of peopleArray){ //loop through people array
        if(x.id === id){ //if id in array matches id parameter, return the person object
            return x;
        }
    }

    throw "Error: Person not found"; //if not found in array, throw error
}

//Returns an array of people who have the same email address domain from people.json.
const sameEmail = async function sameEmail(emailDomain){
    //error checking
    if(!emailDomain){
        throw "Error: Email parameter must exist!";
    }
    if(typeof emailDomain != 'string'){
        throw "Error: Email parameter must be of type string!";
    }
    if(emailDomain === " "){
        throw "Error: Email parameter cannot just be empty spaces!";
    }
    if(!emailDomain.includes(".")){
        throw "Error: Email must contain a dot!";
    }
    if(emailDomain[0] === "."){
        throw "Error: Email must have a name before the dot!";
    }
    //checking for the LAST dot in the email
    let lastDotPlace = 0, endLength = 0;
    for(i = 0; i < emailDomain.length; i++){
        if(emailDomain[i] === "."){
            lastDotPlace = i;
        }
    }
    let tailEnd = emailDomain.substring(lastDotPlace + 1);
    let endLetters = 0;
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    //making sure the last two characters are LETTERS
    for(i = 0; i < tailEnd.length; i++){
        for(letr of letters){
            if(tailEnd[i] === letr || tailEnd[i] === letr.toLowerCase()){
                endLetters++;
            }
        }
    }
    if(endLetters < 2){
        throw "Error: Domain must have at least two letters after the dot!";
    }
    //ignoring case sensitivity
    emailDomain = emailDomain.toLowerCase(); //case insensitivity
    let peopleArray = await getPeople();
    let returnArray = [];
    //looping through the people object
    for(x of peopleArray){
        //manipulating the email field to match the format of the parameter's
        let cutX = x.email.substring(x.email.indexOf("@") + 1);
        if(cutX === emailDomain){ //if the two match, add to the array
            returnArray.push(x);
        }
    }
    //if there are not at least 2 people with the same domain throw an error
    if(returnArray.length < 2){
        throw "Error: There are not at least two people with this domain!";
    }
    return returnArray;
}

//Converts all IP addresses to numbers, then sorts each person's IP field from lowest to highest.
//Returns an object that contain's the person with the highest #, lowest #, and also the average of all #s.
const manipulateIp = async function manipulateIp(){
    //setting initial variables
    let peopleArray = await getPeople();
    let returnArray = [];
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    let total = 0, count = 0
    let maxPerson = {firstName: '', lastName: ''};
    let minPerson = {firstName: '', lastName: ''};
    //looping through people array
    for(x of peopleArray){
        let ipArray = [];
        let ipString = "";
        let ipNum = 0;
        //looping through ip address 
        for(i = 0; i < x.ip_address.length; i++){
            //excluding dots
            if(x.ip_address[i] === "."){
                continue;
            }
            ipArray.push(x.ip_address[i]);
        }
        //sorting the array 1-9
        ipArray.sort();
        //looping through the sorted array
        for(i = 0; i < ipArray.length; i++){
            //excluding 0s
            if(ipArray[i] === '0'){
                continue;
            }
            ipString += ipArray[i];
        }
        //parsing the string into an integer
        ipNum = parseInt(ipString);
        //checking the ip numbers against the minimum
        if(ipNum < min){
            min = ipNum;
            minPerson.firstName = x.first_name;
            minPerson.lastName = x.last_name;
        }
        //checking the ip numbers against the maximum
        if(ipNum > max){
            max = ipNum;
            maxPerson.firstName = x.first_name;
            maxPerson.lastName = x.last_name;
        }
        //adding to a running total and count
        total += ipNum;
        count++;
    }
    return {highest: maxPerson, lowest: minPerson, average: Math.floor(total/count)};
}

//Takes in a month and a day, and returns an array of strings with all people who share that birthday.
const sameBirthday = async function sameBirthday(month, day){
    //parsing the parameters into integers
    month = parseInt(month);
    day = parseInt(day);
    //error checking
    if(!month || !day){
        throw "Error: Both parameters (month and day) must exist!";
    }
    if(typeof month != 'number' || typeof day != 'number'){
        throw "Error: Both parameters (month and day) must be numbers!";
    }
    if(month < 1){
        throw "Error: Month cannot be less than 1!";
    }
    if(month > 12){
        throw "Error: Month cannot be greater than 12!";
    }
    if(month === 4 || month === 6 || month === 9 || month === 11){
        if(day > 30){
            throw "Error: This month doesn't have more than 30 days!";
        }
    }
    if(month === 2){
        if(day > 28){
            throw "Error: This month doesn't have more than 28 days!";
        }
    }
    //creating people array and empty return array
    let peopleArray = await getPeople();
    let returnArray = [];
    //looping through the people array
    for (x of peopleArray){
        let monthString = "", dayString = "", personAdd = "";
        let monthed = true;
        //looping through the date of birth of given person up until the second slash (excluding the year)
        for(i = 0; i < x.date_of_birth.lastIndexOf("/"); i++){
            //if the first / is reached, flip a "switch"
            if(x.date_of_birth[i] === "/"){
                monthed = false;
                continue;
            }  
            //adding to the month
            if(monthed){
                monthString += x.date_of_birth[i];
            }
            //adding to the day
            if(!monthed){
                dayString += x.date_of_birth[i];
            }
        }
        //parsing the strings into integers
        let persMth = parseInt(monthString), persDay = parseInt(dayString);
        //if the parameters of month and day are equal to the current person in the people arrays
        if(persMth === month && persDay === day){
            personAdd = x.first_name + " " + x.last_name;
            returnArray.push(personAdd);
        }
    }
    //if the return array is of size 0, throw an error
    if(returnArray.length < 1){
        throw "Error: There is no one with that birthday!";
    }
    return returnArray;
}

module.exports = {
    getPersonById,
    sameEmail,
    manipulateIp,
    sameBirthday,
}