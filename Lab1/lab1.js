const questionOne = function questionOne(arr) {
    let sum = 0;
    for(x of arr){
        sum += x * x;
    }
    return sum;
}

const questionTwo = function questionTwo(num) { 
    if(num < 1){
        return 0;
    }
    else if(num === 1){
        return 1;
    }
    else{
        return questionTwo(num - 1) + questionTwo(num - 2);
    }
}

const questionThree = function questionThree(text) {
    let vowSum = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
    for(x of text){
        for(v of vowels){
            if(x === v){
                vowSum += 1;
            }
        }
    }
    return vowSum;
}

const questionFour = function questionFour(num) {
    if(num < 0){
        return NaN;
    }
    else if(num === 1 || num === 0){
        return 1;
    }
    else{
        return questionFour(num - 1) * num;
    }
}

module.exports = {
    firstName: "JOHN", 
    lastName: "SCHNEIDERHAN", 
    studentId: "10445111",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};