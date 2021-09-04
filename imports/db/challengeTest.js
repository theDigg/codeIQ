let newTests = [
  {
    description: 'isEven should be a function',
    test: "typeof isEven === 'function'",
  },
  {
    description: 'isEven should return a boolean',
    test: "typeof isEven(2) === 'boolean'",
  },
  {
    description: 'isEven(6) should be true',
    test: 'isEven(6) === true',
  },
  {
    description: 'isEven(3) should be false',
    test: 'isEven(6) === false',
  },
  {
    description: 'isEven(9) should be false',
    test: 'isEven(9) === false',
  },
  {
    description: 'isEven(3242566578) should be true',
    test: 'isEven(3242566578) === true',
  },
];

console.log(
  JSON.stringify({
    body: 'Write a function isEven that takes a number and returns a boolean representing whether or not a number is even.',
    solution: 'function isEven(n) {\n\n}',
    tests: newTests,
    title: 'isEven',
  }),
);
