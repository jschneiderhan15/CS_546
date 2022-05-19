const people = require("./people");
const stocks = require("./stocks");

async function main(){
//getPersonById Tests
    //should pass
    try{
        const getPersonOne = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log (getPersonOne);
    }catch (e){
        console.log(e);
    }
    //should fail
    try{
        const getPersonTwo = await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log(getPersonTwo);
    }catch (e){
        console.log(e);
    }
//sameEmail Tests
    //should pass
    try{
        const sameEmailOne = await people.sameEmail("HaRvArD.edu");
        console.log (sameEmailOne);
    }catch (e){
        console.log(e);
    }
    //should fail
    try{
        const sameEmailTwo = await people.sameEmail("google.com.hk");
        console.log(sameEmailTwo);
    }catch (e){
        console.log(e);
    }
//manipulateIp Tests
    //should pass
    try{
        const manipOne = await people.manipulateIp();
        console.log (manipOne);
    }catch (e){
        console.log(e);
    }
//sameBirthday Tests
    //should pass
    try{
        const birthdayOne = await people.sameBirthday(9, 25);
        console.log (birthdayOne);
    }catch (e){
        console.log(e);
    }
    //should fail
    try{
        const birthdayTwo = await people.sameBirthday("     ", 25);
        console.log(birthdayTwo);
    }catch (e){
        console.log(e);
    }
//listShareholders Tests
    //should pass
    try{
        const listShareOne = await stocks.listShareholders("Aeglea BioTherapeutics, Inc.");
        console.log (listShareOne);
    }catch (e){
        console.log(e);
    }
    //should fail
    try{
        const listShareTwo = await stocks.listShareholders("     ");
        console.log(listShareTwo);
    }catch (e){
        console.log(e);
    }
//totalShares Tests
    //should pass
    try{
        const totalShareOne = await stocks.totalShares('Aeglea BioTherapeutics, Inc.');
        console.log (totalShareOne);
    }catch (e){
        console.log(e);
    }
    //should fail
    try{
        const totalShareTwo = await stocks.totalShares();
        console.log(totalShareTwo);
    }catch (e){
        console.log(e);
    }
//listStocks Tests
    //should pass
    try{
        const listStocksOne = await stocks.listStocks("Grenville", "Pawelke");
        console.log (listStocksOne);
    }catch (e){
        console.log(e);
    }
    //should fail
    try{
        const listStocksTwo = await stocks.listStocks(1,3);
        console.log(listStocksTwo);
    }catch (e){
        console.log(e);
    }
//getStockById Tests
    //should pass
    try{
        const getStockOne = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log (getStockOne);
    }catch (e){
        console.log(e);
    }
    //should fail
    try{
        const getStockTwo = await stocks.getStockById("23419rjfjd29");
        console.log(getStockTwo);
    }catch (e){
        console.log(e);
    }
}

main();