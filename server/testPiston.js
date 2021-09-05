import piston from 'piston-client';
const client = piston({ server: 'http://localhost:2000' });

const testChallenge = {
  name: 'isEven',
  description: 'Return if a given input number n is even or not',
  solution: 'function isEven(n) {\n console.log(n) \n console.log(n) \n return n % 2 == 0 \n}',
  tests: [
    { description: 'isEven should be a function', test: "typeof isEven === 'function'" },
    { description: 'isEven should return a boolean', test: "typeof isEven(2) === 'boolean'" },
    { description: 'isEven(6) should be true', test: 'isEven(6) === true' },
    { description: 'isEven(3) should be false', test: 'isEven(3) === false' },
    { description: 'isEven(9) should be false', test: 'isEven(9) === false' },
    { description: 'isEven(3242566578) should be true', test: 'isEven(3242566578) === true' },
  ],
};

console.log(testChallenge.solution.matchAll(/console\.log\(([^)]+)\)/g));

const parseTests = (output) => {
  let parsed = [];
  let userConsole = [];
  let outputArray = output.split('\n');
  console.log(outputArray);
  let testCount = 1;
  outputArray.forEach((item, i) => {
    try {
      let test = JSON.parse(item);
      if (typeof test === 'object') {
        parsed.push(test);
        testCount++;
      } else {
        userConsole.push({ test: testCount, output: test });
      }
    } catch (e) {
      // console.log(e);
    }
  });
  return {
    results: parsed,
    consoleOutput: userConsole,
  };
};

(async () => {
  let mappedTests = testChallenge.tests.map((obj, i) => {
    // return `console.log(${JSON.stringify(obj.description)}, ${obj.test})`;
    return `console.log(JSON.stringify(["test" + ${i + 1}, ${obj.test}]))`;
  });
  const result = await client.execute(
    'javascript',
    `${testChallenge.solution};
    ${mappedTests}
    `,
  );
  console.log(result.run.output);
  console.log(parseTests(result.run.output));
})();
// console.log([${testChallenge.tests.map((test) => [JSON.stringify(test.description), test.test])}])
