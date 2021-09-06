import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import Challenges from '../db/Challenges';
import piston from 'piston-client';
import * as utils from '../utils/stringUtils';
// ! Need to run a separate server for this piston API for the final deployment
// TODO: just remember to have the piston-client in node_modules post the content type:
/*
  headers: {
    'Content-Type': 'application/json'
  },
*/
const client = piston({ server: 'http://localhost:2000' }); // If running the piston API locally
// const client = piston({ server: 'https://emkc.org' });

const parseTests = (output) => {
  let tests = [];
  let consoleOutput = [];
  let outputArray = output.split('\n');
  let testCount = 1;
  outputArray.forEach((item, i) => {
    try {
      let test = JSON.parse(item);
      console.log(test);
      if (typeof test === 'object' && 'passed' in test) {
        tests.push(test);
        testCount++;
      } else {
        consoleOutput.push({ test: testCount, output: test });
      }
    } catch (e) {
      consoleOutput.push({ test: testCount, output: item });
    }
  });
  return {
    tests,
    consoleOutput,
  };
};

Meteor.methods({
  'challenges.insert'(title) {
    check(title, String);

    if (!this.userId) throw new Meteor.Error('Not authorized.');

    Challenges.insert({
      title,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  'challenges.edit'(challengeId, value) {
    check(challengeId, String);
    check(value, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const challenge = Challenges.findOne({
      _id: challengeId,
    });

    if (!challenge) {
      throw new Meteor.Error('Access denied.');
    }

    Challenges.update(challengeId, {
      $set: {
        solution: value,
      },
    });
  },

  'challenges.remove'(challengeId) {
    check(challengeId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const challenge = Challenges.findOne({
      _id: challengeId,
      userId: this.userId,
    });

    if (!challenge) {
      throw new Meteor.Error('Access denied.');
    }

    Challenges.remove(challengeId);
  },

  'challenges.setCompleted'(challengeId, isCompleted) {
    check(challengeId, String);
    check(isCompleted, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const challenge = Challenges.findOne({
      _id: challengeId,
      userId: this.userId,
    });

    if (!challenge) {
      throw new Meteor.Error('Access denied.');
    }

    Challenges.update(challengeId, {
      $set: {
        isCompleted,
      },
    });
  },

  'challenges.submit'(challengeId, code) {
    check(challengeId, String);
    check(code, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const challenge = Challenges.findOne({
      _id: challengeId,
    });

    if (!challenge) {
      throw new Meteor.Error('No challenge was found :(');
    } else {
      (async () => {
        let mappedTests = challenge.io.tests.map(
          (test, i) =>
            `console.log(JSON.stringify({ "test": ${test.id}, "output": output = ${challenge.name}(${test.input}), "passed": output === ${test.output} }))`,
        );
        const result = await client.execute(
          'javascript',
          `${code}
           ${mappedTests}`,
        );
        try {
          const { tests, consoleOutput } = parseTests(result.run.output);
          console.log(tests, consoleOutput);
          if (tests.every((test) => test.passed === true)) {
            const strippedCode = utils.removeComments(code);
            const solutionLength = strippedCode.split` `.join``.length;
            Challenges.update(challengeId, {
              $set: {
                tests,
                consoleOutput,
                completed: true,
              },
              $min: {
                shortestSolution: solutionLength,
              },
            });
          } else {
            Challenges.update(challengeId, {
              $set: {
                tests,
                consoleOutput,
              },
            });
          }
        } catch (err) {
          Challenges.update(challengeId, {
            $set: {
              tests,
              consoleOutput,
              err,
            },
          });
        }
      })();
    }
  },
});
