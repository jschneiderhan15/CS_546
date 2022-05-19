//function to check if the argument is a string
const checkIfString = function checkIfString(str){
    if(typeof str != "string"){
        throw "The argument must be a string!";
    }
}

//function to convert a sentence into one camelcase string
const camelCase = function camelCase(str){
    //error checking
    if(str === null){
        throw "THe string has to exist!";
    }
    checkIfString(str);
    if(str.length === 0){
        throw "The string must be of length greater than 0!";
    }
    str = str.toLowerCase(); //convert the entire string to lowercase
    let camelString = "";
    let camelCheck = false, first = true;
    let spaceCount = 0;
    for(i = 0; i < str.length; i++){
        if(str[i] === " "){ //if the given char is a space
            if(!first)
                camelCheck = true;
            spaceCount++;
            continue;
        }
        if(first){ //if its the first letter
            camelString += str[i].toLowerCase();
            first = false;
            continue;
        }
        if(camelCheck){ //if its the "beginning" letter of a word
            camelString += str[i].toUpperCase();
            camelCheck = false;
            continue;
        }
        camelString += str[i];
    }
    if(spaceCount === str.length){ //if the string is just spaces
        throw "String must have more than just spaces!";
    }
    return camelString;
}

//function to convert repeating characters into $ * characters repeatedly
const replaceChar = function replaceChar(str){
    //error checking
    if(str === null){
        throw "String must exist!";
    }
    checkIfString(str);
    if(str.length === 0){
        throw "String must be of length greater than 0!";
    }
    //setting variables
    let specialChar = str[0];
    let counter = 0, spaceCount = 0;
    let retStr = str[0];
    //checking for strings that are just spaces
    for(i = 0; i < str.length; i++){
        if(str[i] === " "){
            spaceCount++;
        }
    }
    //looping through the string
    for(i = 1; i < str.length; i++){
        //checking if the given char is equal to the "special char" aka the starting letter
        if(str[i] === specialChar.toUpperCase() || str[i] === specialChar.toLowerCase()){
            //alternating between using stars and dollar signs
            if(counter % 2 === 0){
                retStr += "*";
            }
            else if(counter % 2 === 1){
                retStr += "$";
            }
            counter++;
            continue;
        }
        retStr += str[i];
    }
    //throw error if string is purely made of spaces
    if(spaceCount === str.length){
        throw "String must be more than spaces!";
    }
    return retStr;
}

//function to mash up both strings, replacing the starting letters
const mashUp = function mashUp(str1, str2){
    //error checking
    if(str1 === null || str2 === null){
        throw "Strings must both exist!";
    }
    checkIfString(str1);
    checkIfString(str2);
    if(str1.length < 2 || str2.length < 2){
        throw "Both strings must be of length greater than 2!";
    }
    let spaceCount1 = 0, spaceCount2 = 0;
    let retStr = str2.substr(0,2); //taking the first two letters of the second string
    //checking number of spaces
    for(i = 0; i < str1.length; i++){
        if(str1[i] == " "){
            spaceCount1++;
        }
    }
    //adding the rest of string 1
    for(i = 2; i < str1.length; i++){
        retStr += str1[i];
    }
    retStr += " " + str1.substr(0, 2); //taking the first two letters of the first string
    //checking number of spaces
    for(i = 0; i < str2.length; i++){
        if(str2[i] == " "){
            spaceCount2++;
        }
    }
    //adding the rest of string 2
    for(i = 2; i < str2.length; i++){
        retStr += str2[i];
    }
    //throw error if strings are just spaces
    if(spaceCount1 === str1.length || spaceCount2 === str2.length){
        throw "Strings cannot just be spaces!";
    }
    return retStr;
}

module.exports = {
    camelCase, 
    replaceChar,
    mashUp
}