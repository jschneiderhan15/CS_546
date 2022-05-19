//function that converts an array of objects into an array of their respective attributes
const makeArrays = function makeArrays(arr){
    //error checking
    if(arr === null){
        throw "Array must exist!";
    }
    if(!Array.isArray(arr)){
        throw "Argument must be an array!";
    }
    if(arr.length < 2){
        throw "Array must have at least 2 items!";
    }
    let retArr = [];
    let counter = 0;
    //looping through array
    for(x of arr){
        let tempArr = [];
        //checking if array has just objects
        if(typeof x != 'object'){
            throw "Array must contain ONLY objects!";
        }
        //checking how many keys are in the object
        if(Object.keys(x).length === 0){
            throw "All objects must not be empty!";
        }
        //adding the attributes to a temporary array to be added to the larger array
        for(attr in x){
            tempArr = [attr, x[attr]];
            retArr[counter] = tempArr;
            counter++;
        }
    }
    return retArr;
}

//function that checks (at every level) if two given objects are equal
const isDeepEqual = function isDeepEqual(obj1, obj2){
    //error checking
    if(obj1 === null || obj2 === null){
        throw "Both parameters must exist!";
    }
    if(typeof obj1 != 'object' || typeof obj2 != 'object'){
        throw "Both parameters must be objects!";
    }
    if(obj1 === {} && obj2 === {}){
        return true;
    }
    if(Array.isArray(obj1) || Array.isArray(obj2)){
        throw "Both parameters cannot be arrays!";
    }
    //initiating array to store keys and sorting them so theyre in the same order
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    keys1.sort();
    keys2.sort();
    //if key arrays are different sizes, then the objects cant be the same
    if(keys1.length != keys2.length){
        return false;
    }
    //looping through the keys
    for(i = 0; i < keys1.length; i++){
        //if the attributes at this index are objects
        if(typeof obj1[keys1[i]] === 'object' && typeof obj2[keys2[i]] === 'object'){
            //check if they deep equals with a recursive call
            if(isDeepEqual(obj1[keys1[i]], obj2[keys2[i]])){
                //if they are equal, then delete them from the overall object and move on 
                delete obj1[keys1[keys1.length - i - 1]];
                delete obj2[keys2[keys2.length - i - 1]];
                isDeepEqual(obj1, obj2);
            }
            //if not equal, break out and return false
            else{
                return false;
            }
        }
        //if the keys arent objects, just check them against each other
        if(keys1[i] === keys2[i]){
            //make sure to remember to check the values in addition to the keys
            if(obj1[keys1[i]] === obj2[keys2[i]]){
                continue;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    return true;
}

//function that takes a function and applies it to given objects attributes
const computeObject = function computeObject(object, func){
    //error checking
    if(object === null){
        throw "Object must exist!";
    }
    if(typeof object != 'object'){
        throw "Object must be of type object!";
    }
    if(func === null){
        throw "Function must exist!";
    }
    if(typeof func != 'function'){
        throw "Function must be of type function!";
    }
    //looping through the object's attributes
    for(x in object){
        //checks if the attributes are numbers
        if(typeof object[x] != 'number'){
            throw "All attributes of object MUST be a number!";
        }
        object[x]= func(object[x]); //setting the object's attributes to the function
    }
    return object;
}

module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
}