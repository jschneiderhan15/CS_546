const arrays = require("./arrayUtils");
const strings = require("./stringUtils");
const objects = require("./objUtils");

//#1: MEAN TESTS
try{
   // PASSING
   const meanOne = arrays.mean([6,7,8]);
   console.log('Mean: ' + meanOne + ' (should be 7). Passed successfully!');
} catch (e){
   console.error('Mean: failed test case');
}
try{
   // SHOULD FAIL
   const meanTwo = arrays.mean(["apple", 3, 4, "potato"]);
   console.error('Mean: did not error.');
} catch(e){
   console.log('Mean: failed successfully!');
}

//#2: MEDIAN SQUARED TESTS
try{
   // PASSING
   const medianOne = arrays.medianSquared([4, 1, 2]);
   console.log('Median Squared: ' + medianOne + ' (should be 4). Passed successfully!');
} catch (e){
   console.error('Median Squared: failed test case');
}
try{
   // SHOULD FAIL
   const medianTwo = arrays.medianSquared();
   console.error('Median Squared: did not error.');
} catch(e){
   console.log('Median Squared: failed successfully!');
}

//#3: MAX ELEMENT TESTS
try{
   // PASSING
   const maxOne = arrays.maxElement([5, 6, 7]);
   console.log('Max Element: Should be { \'7\': 2 }. Passed successfully!');
   console.log(maxOne);
} catch (e){
   console.error('Max Element: failed test case');
}
try{
   // SHOULD FAIL
   const maxTwo = arrays.maxElement([1,2,"gorilla"]);
   console.error('Max Element: did not error.');
} catch(e){
   console.log('Max Element: failed successfully!');
}

//#4: FILL TESTS
try{
   // PASSING
   const fillOne = arrays.fill(3, "Welcome");
   console.log('Fill: Should be ["Welcome", "Welcome", "Welcome"]. Passed successfully!');
   console.log(fillOne);
} catch (e){
   console.error('Fill: failed test case');
}
try{
   // SHOULD FAIL
   const fillTwo = arrays.fill(-4);
   console.error('Fill: did not error.');
} catch(e){
   console.log('Fill: failed successfully!');
}

//#5: COUNT REPEATING TESTS
try{
   // PASSING
   const repeatOne = (arrays.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]));
   console.log('CountRepeating: (should be { \'7\': 2, true: 3, Hello: 2}). Passed successfully!');
   console.log(repeatOne);
} catch (e){
   console.error('CountRepeating: failed test case');
}
try{
   // SHOULD FAIL
   const camelTwo = arrays.countRepeating({a: 1, b: 2, c: "Patrick"});
   console.error('CountRepeating: did not error.');
} catch(e){
   console.log('CountRepeating: failed successfully!');
}

//#6: IS EQUAL TESTS
try{
   // PASSING
   const equalOne = arrays.isEqual([1, 2, [1, 2, 3]], [1, [1, 2, 3], 2] );
   console.log('IsEqual: ' + equalOne + ' (should be true). Passed successfully!');
} catch (e){
   console.error('IsEqual: failed test case');
}
try{
   // SHOULD FAIL
   const equalTwo = arrays.isEqual(1, 2);
   console.error('IsEqual: did not error.');
} catch(e){
   console.log('IsEqual: failed successfully!');
}
//#7: CAMELCASE TESTS
try{
   // PASSING
   const camelOne = strings.camelCase("How nOw BrOwn cow");
   console.log('CamelCase: ' + camelOne + ' (should be howNowBrownCow). Passed successfully!');
} catch (e){
   console.error('CamelCase: failed test case');
}
try{
   // SHOULD FAIL
   const camelTwo = strings.camelCase(["hello", "world"]);
   console.error('CamelCase: did not error.');
} catch(e){
   console.log('CamelCase: failed successfully!');
}

//#8 REPLACE CHAR TESTS
try{
   // PASSING
   const replaceOne = strings.replaceChar("Daddy");
   console.log('ReplaceChar: ' + replaceOne + ' (should be Da*$y). Passed successfully!');
} catch (e) {
   console.error('Mashup: failed test case')
}
try{
   // SHOULD FAIL
   const replaceTwo = strings.replaceChar(123);
   console.log('ReplaceChar: did not error.');
} catch (e) {
   console.error('ReplaceChar: failed successfully!');
}
//#9 MASHUP TESTS
try{
   // PASSING
   const mashOne = strings.mashUp("Patrick", "Hill");
   console.log('Mashup: ' + mashOne + ' (should be Hitrick Pall). Passed successfully!');
} catch (e){
   console.error('Mashup: failed test case');
}
try{
   // SHOULD FAIL
   const camelTwo = strings.mashUp("Patrick", "    ");
   console.error('Mashup: did not error.');
} catch(e){
   console.log('Mashup: failed successfully!');
}

//#10 MAKE ARRAYS TESTS
try{
   const first = { x: 2, y: 3};
   const second = { a: 70, x: 4, z: 5 };
   const third = { x: 0, y: 9, q: 10 };
   // PASSING
   const makeOne = objects.makeArrays([first, second, third]);
   console.log('MakeArrays: Should be [ [\'x\',2],[\'y\',3], [\'a\',70], [\'x\', 4], [\'z\', 5], [\'x\',0], [\'y\',9], [\'q\',10] ]. Passed successfully!');
   console.log(makeOne);
} catch (e){
   console.error('MakeArrays: failed test case');
}
try{
   // SHOULD FAIL
   const makeTwo = strings.makeArrays([{}, first, second]);
   console.error('MakeArrays: did not error.');
} catch(e){
   console.log('MakeArrays: failed successfully!');
}
//#11 IS DEEP EQUAL TESTS
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
try{
   // PASSING
   const deepOne = objects.isDeepEqual(forth, fifth);
   console.log('IsDeepEqual: ' + deepOne + ' (Should be true). Passed successfully!');
} catch (e){
   console.error('isDeepEqual: failed test case');
}
try{
   // SHOULD FAIL
   const deepTwo = objects.isDeepEqual("foo", "bar");
   console.error('isDeepEqual: did not error.');
} catch(e){
   console.log('isDeepEqual: failed successfully!');
}

//#12 COMPUTE OBJECT TESTS
try{
   // PASSING
   const compOne = objects.computeObject({a:3, b:7, c:5}, n => n * 2);
   console.log('ComputeObject: Should be {a: 6, b: 14, c: 10}. Passed successfully!');
   console.log(compOne);
} catch (e){
   console.error('ComputeObject: failed test case');
}
try{
   // SHOULD FAIL
   const camelTwo = strings.computeObject({a: 2, b: 3, c: 5}, "a");
   console.error('ComputeObject: did not error.');
} catch(e){
   console.log('ComputeObject: failed successfully!');
}
