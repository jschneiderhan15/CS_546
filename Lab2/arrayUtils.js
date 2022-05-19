const { makeArrays } = require("./objUtils");

//function to check if the argument is an array
const checkIfArray = function(arr){
    if(!Array.isArray(arr)){
        throw "The argument must be an array!";
    }
}

//function to determine the mean of an array
const mean = function mean(arr) {
    //error checking
    if(arr === null){
        throw "Array must exist!";
    }
    checkIfArray(arr);
    if(arr.length === 0){
        throw "Array must be not empty!";
    }
    let sum = 0;
    for(x of arr){ //loop through array
        if(typeof x != "number"){
            throw "Elements must be a number";
        }
        sum += x; //add numbers to the sum
    }
    return sum / arr.length;
}

//function used to determine the square of the median of an array
const medianSquared = function medianSquared(arr){
    //error checking
    if(arr === null){
        throw "Array must exist!";
    }
    checkIfArray(arr);
    if(arr.length === 0){
        throw "Array must not be empty!";
    }
    for(x of arr){
        if(typeof x != "number"){
            throw "Elements must be a number";
        }
    }
    let median = 0;
    arr = arr.sort(); //sorting the array
    if(arr.length % 2 == 0){ //if the array has an even # of an items you need to split the middle
        median = (arr[arr.length/2 - 1] + arr[arr.length/2]) / 2;
    }
    else if(arr.length % 2 == 1){ //if the array has an odd number of items select the middle
        median = Math.floor(arr.length / 2) + 1;
    }
    return median * median;
}

//function used to find the max element of an array
const maxElement = function maxElement(arr){
    //error checking
    if(arr === null){
        throw "Array must exist!";
    }
    checkIfArray(arr);
    if(arr.length === 0){
        throw "Array must not be empty!";
    }
    let index = 0;
    let maxVal = Number.MIN_SAFE_INTEGER; //setting the max to the lowest possible number
    for(i = 0; i < arr.length; i++){
        if(typeof arr[i] != "number"){
            throw "Elements must be number";
        }
        if(arr[i] > maxVal){ //checking the maxval and resetting it if the current value is greater than the maxval
            maxVal = arr[i];
            index = i;
        }
    }
    let obj = {[maxVal] : index}
    return obj;
}

//function used to fill an array with a set number of values
const fill = function fill(end, value = null){
    //error checking
    if(end === null){
        throw "End must exist!";
    }
    if(typeof end != 'number'){
        throw "End must be a number!";
    }
    if(end <= 0){
        throw "End must be a positive number greater than 0.";
    }
    let filled = new Array(end);
    let count = 0; //counter to hold the values
    for(i = 0; i < end; i++){
        if(value != null) //filling with the value input
            filled[i] = value;
        else{ //filling the incremented number 
            filled[i] = count;
            count++;
        }
    }
    return filled;
}

//function that counts the repeats in an array
const countRepeating = function countRepeating(arr){
    //error checking
    if(arr === null){
        throw "Array must exist!";
    }
    checkIfArray(arr);
    if(arr.length === 0){
        return {};
    }
    //setting variables
    let retObj = {};
    //looping through array
    for(x of arr){
        //if the object doesnt have the attribute already, set it to 1
        if(!retObj[x]){
            retObj[x] = 1;
            continue;
        }
        //else, increment the count of the object's attribute
        else{
            retObj[x]++;
        }
    }
    //looping through the object's attributess
    for(attr in retObj){
        //deleting any objects that have no duplicates
        if(retObj[attr] === 1){
            delete retObj[attr];
        }
    }
    return retObj;
}

//function to determine if both arrays given in parameters are equal
const isEqual = function isEqual(arr1, arr2){
    //error checking
    if(arr1 === null || arr2 === null){
        throw "Both parameters must exist!";
    }
    checkIfArray(arr1);
    checkIfArray(arr2);
    //if the lengths are different, return false
    if(arr1.length != arr2.length){
        return false;
    }
    //if the arrays are empty, return true (base case)
    if(arr1.length === 0 && arr2.length === 0){
        return true;
    }
    //sorting the arrays
    arr1.sort();
    arr2.sort();
    //for every element in the array,
    for(i = 0; i < arr1.length; i++){
        //if the given element is an array
        if(Array.isArray(arr1[i])){
            //check if the two arrays in the element are equal
            if(isEqual(arr1[i], arr2[i])){
                //if so, delete the element and move on
                arr1.splice(arr1.length - i + 1);
                arr2.splice(arr2.length - i + 1);
                return isEqual(arr1, arr2);
            }
            else{
                return false;
            }
        }
        else{
            //otherwise just loop through and continue checking the elements against each other
            if(arr1[i] != arr2[i]){
                return false;
            }
        }
    }
    return true;
}

module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual,
};