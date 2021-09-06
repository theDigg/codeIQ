// import piston from 'piston-client';
// const client = piston({ server: 'http://localhost:2000' });

// const testChallenge = {
//   name: 'isEven',
//   description: 'Return if a given input number n is even or not',
//   solution: 'function isEven(n) {\n console.log([n]) \n console.log(n) \n return n % 2 == 0 \n}',
//   tests: [
//     { description: 'isEven should be a function', test: "typeof isEven === 'function'" },
//     { description: 'isEven should return a boolean', test: "typeof isEven(2) === 'boolean'" },
//     { description: 'isEven(6) should be true', test: 'isEven(6) === true' },
//     { description: 'isEven(3) should be false', test: 'isEven(3) === false' },
//     { description: 'isEven(9) should be false', test: 'isEven(9) === false' },
//     { description: 'isEven(3242566578) should be true', test: 'isEven(3242566578) === true' },
//   ],
// };

const testChallenge = {
  name: 'isEven',
  description: 'Given an integer `n`, return whether or not `n` is an even number',
  authorSolution: {
    sources: [
      {
        source: 'function isEven(n) {\n return n % 2 == 0 \n}',
        language: 'js',
      },
    ],
  },
  source: 'function isEven(n) {\n console.log(n) \n console.log([n]) \n return n % 2 == 0 \n}',
  language: 'js',
  io: {
    input: [
      {
        description: 'An integer',
        name: 'n',
        type: 'integer',
      },
    ],
    output: {
      description: 'A boolean for whether n is even or not',
      type: 'boolean',
    },
    tests: [
      {
        id: 1,
        input: [6],
        output: true,
      },
      {
        id: 2,
        input: [3],
        output: false,
      },
      {
        id: 3,
        input: [9],
        output: false,
      },
      {
        id: 4,
        input: [240],
        output: true,
      },
    ],
    timeLimits: {
      js: 9000,
    },
  },
};

const parseTests = (output) => {
  let tests = [];
  let consoleOutput = [];
  let outputArray = output.split('\n');
  let testCount = 1;
  outputArray.forEach((item, i) => {
    try {
      let test = JSON.parse(item);
      console.log(test);
      if (typeof test === 'object' && "output" in test && "passed" in test) {
        tests.push(test);
        testCount++;
      } else {
        consoleOutput.push({ test: testCount, output: test });
      }
    } catch (e) {
    //   console.log(e);
    }
  });
  return {
    tests,
    consoleOutput,
  };
};

// (async () => {
//   let mappedTests = testChallenge.io.tests.map(
//     (test, i) =>
//       `console.log(JSON.stringify({ "test": ${test.id}, "output": output = ${testChallenge.name}(${test.input}), "passed": output === ${test.output} }))`,
//   );
//   const result = await client.execute(
//     'javascript',
//     `${testChallenge.source}
//     ${mappedTests}
//     `,
//   );
//   console.log(parseTests(result.run.output));
// })();
