/* eslint-disable */
import ChallengesCollection from './challenges';

const challenges = [
  {
    body: "Write a function called helloWorld that Returns the string 'Hello World' using two variables example: helloWorld() // returns 'Hello World'",
    solution: "function helloWorld() {\n  const hello = '';\n  const world = '';\n  ______ hello + ' ' + world;\n}",
    tests: "[typeof helloWorld === 'function', helloWorld() === 'Hello World']",
    testDescriptions: '["helloWorld should be a function", "return value should be Hello World"]',
    title: 'Hello World!',
  },
  {
    body: 'Write a function called compareTriangleAndCircle that takes 3 arguments, 2 numbers for the base and a height of the triangle and a number corresponding to the radius of a circle, compute the areas of both circle and triangle, and return which area is larger.',
    solution: 'function compareTriangleAndCircle(base, height, radius) {\n\n}',
    tests:
      "[typeof compareTriangleAndCircle === 'function', compareTriangleAndCircle(3,4,3) === 'Circle', compareTriangleAndCircle(12,24,6.5) === 'Triangle', compareTriangleAndCircle(10,10,5) === 'Circle', compareTriangleAndCircle(5,21,4) === 'Triangle', compareTriangleAndCircle(254,51,50) === 'Circle']",
    testDescriptions:
      '["compareTriangleAndCircle should be a function", "Between a 3, 4 triangle and a circle of radius 3, the circle is bigger", "Between a 12, 24 triangle and a circle of radius 6.5, the triangle is bigger", "Between a 10, 10 triangle and a circle of radius 5, the circle is bigger", "Between a 5, 21 triangle and a circle of radius 4, the triangle is bigger", "Between a 254, 51 triangle and a circle of radius 50, the circle is bigger"]',
    title: 'Compare triangle and circle',
  },
  {
    body: 'Write a function joinObjects that takes in 2 different objects and adds the properties of the 2nd object to the first and then returns the first object with the new properties attached.',
    solution: 'function joinObjects(obj1, obj2) {\n\n}',
    tests:
      "[typeof joinObjects === 'function', typeof joinObjects({1: 1}, {2: 2}) === 'object' && !Array.isArray(joinObjects({1: 1}, {2: 2})), joinObjects({1: 1}, {2: 2})[1] === 1 && joinObjects({1: 1}, {2: 2})[2] === 2, joinObjects({1: 1}, {1: 5, 2: 2})[1] === 1 && joinObjects({1: 1}, {1: 5, 2: 2})[2] === 2]",
    testDescriptions:
      '["joinObjects should be a function", "return value should be an object", "should join separate objects into one", "should not overwrite first object"]',
    title: 'Join Objects',
  },
  {
    body: 'Write a function fibonacci that takes an integer n and returns the nth number of the fibonacci sequence. DO NOT USE RECURSION. Code must run in O(n) time.',
    solution: 'function fibonacci(n) {\n\n}',
    tests:
      "[typeof fibonacci === 'function', typeof fibonacci(3) === 'number', fibonacci(0) === 0, fibonacci(1) === 1, fibonacci(2) === 1, fibonacci(3) === 2, fibonacci(10) === 55, fibonacci(20) === 6765, fibonacci(40) === 102334155]",
    testDescriptions:
      '["fibonacci should be a function", "fibonacci should return a number", "the 0th fibonacci number is 0", "the 1st fibonacci number is 1", "the 2nd fibonacci number is 1", "the 3rd fibonacci number is 2", "the 10th fibonacci number is 55", "the 20th fibonacci number is 6765", "the 40th fibonacci number is 102334155"]',
    title: 'Fibonacci',
  },
  {
    body: 'Write a function sumArray that takes an array and returns the sum of all elements in the array',
    solution: 'function sumArray(arr) {\n\n}',
    tests:
      "[typeof sumArray === 'function', typeof sumArray([1,2,3]) === 'number', sumArray([1,2,3]) === 6, sumArray([-3,0,3,3]) === 3, sumArray([4,6,-5,12,50]) === 67, sumArray([4,4,4,4]) === 16]",
    testDescriptions:
      '["sumArray should be a function", "sumArray should return a number", "sumArray([1,2,3]) should equal 6", "sumArray([-3,0,3,3]) should equal 3", "sumArray([4,6,-5,12,50]) should equal 67", "sumArray([4,4,4,4]) should equal 16"]',
    title: 'sumArray',
  },
  {
    body: 'Write a function isEven that takes a number and returns a boolean representing whether or not a number is even.',
    solution: 'function isEven(n) {\n\n}',
    tests:
      "[typeof isEven === 'function', typeof isEven(2) === 'boolean', isEven(6) === true, isEven(3) === false, isEven(9) === false, isEven(29485) === false, isEven(3242566578) === true]",
    testDescriptions:
      '["isEven should be a function", "isEven should return a boolean", "isEven(6) should be true", "isEven(3) should be false", "isEven(9) should be false", "isEven(29485) should be false", "isEven(3242566578) should be true"]',
    title: 'isEven',
  },
];

export default () => {
  challenges.forEach((challenge) => {
    ChallengesCollection.insert(challenge, (err, docs) => {
      if (err) console.log(err);
      console.log(docs);
    });
  });
};
