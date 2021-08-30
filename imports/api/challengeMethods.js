import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import Challenges from '../db/challenges';
import piston from 'piston-client';
import * as utils from '../utils/stringUtils'
// ! Need to run a separate server for this piston API for the final deployment
// TODO: just remember to have the piston-client in node_modules post the content type:
/*
  headers: {
    'Content-Type': 'application/json'
  },
*/
const client = piston({ server: 'http://localhost:2000' }); // If running the piston API locally
// const client = piston({ server: 'https://emkc.org' });

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
        console.log(challengeId, code, challenge.tests);
        let strippedCode = utils.removeComments(code)
        console.log(strippedCode);
        const result = await client.execute(
          'javascript',
          `

          ${strippedCode};
          console.log(${challenge.tests});
          `,
        );
        Challenges.update(challengeId, {
          $set: {
            result,
          },
        });
        const solutionLength = strippedCode.split` `.join``.length
        console.log('solutionLength: ', solutionLength);
        console.log(result);
        console.log(JSON.parse(result.run.output));
        if (JSON.parse(result.run.output).every((result) => result)) {
          console.log('You passed!!');
          Challenges.update(challengeId, {
            $min: {
              shortest: solutionLength
            }
          })
        } else {
          console.log('You failed!!');
        }
      })();
    }
  },
});
