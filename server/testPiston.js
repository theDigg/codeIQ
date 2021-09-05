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

(async () => {
  const results = testChallenge.tests.map(async (test) => {
    const result = await client.execute(
      'javascript',
      `${testChallenge.solution};
        console.log([${JSON.stringify(test.description)}, ${test.test}])`,
    );
    return result;
  });
  await Promise.all(results);
  let finalResults = []
  await results.forEach((result) => {
    result.then(res => {
        console.log(res);
        finalResults.push(res.run.output)
    })
  });
  console.log(finalResults);
  finalResults.forEach(result => {
      console.log(result.split('\n'))
  })

  //   try {
  // let parseResults = JSON.parse(result.run.output.replace(/'/g, '"'));
  // let testResults = parseResults.reduce((acc, result, i, array) => {
  //   if (typeof result === 'string') {
  //     acc.push({
  //       description: result,
  //       result: array[i + 1],
  //     });
  //   }
  //   return acc;
  // }, []);
  // console.log(testResults);
  //     if (testResults.every((test) => test.result === true)) {
  //       const strippedCode = utils.removeComments(code);
  //       const solutionLength = strippedCode.split` `.join``.length;
  //       Challenges.update(challengeId, {
  //         $set: {
  //           result,
  //           testResults,
  //           completed: true,
  //         },
  //         $min: {
  //           shortestSolution: solutionLength,
  //         },
  //       });
  //     } else {
  //       Challenges.update(challengeId, {
  //         $set: {
  //           result,
  //           testResults,
  //         },
  //       });
  //     }
  //   } catch (err) {
  //     Challenges.update(challengeId, {
  //       $set: {
  //         result,
  //         err,
  //       },
  //     });
  //   }
})();
