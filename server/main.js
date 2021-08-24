import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import piston from 'piston-client';
import ChallengesCollection from '/imports/db/challenges';
import RoomsCollection from '/imports/db/rooms';
import seedChallenges from '/imports/db/seedChallenges';
import '/imports/api/challengeMethods';
import '/imports/api/roomMethods';
import '/imports/api/roomPublications';
import './service-config';

const insertRoom = (title, user, url) => {
  RoomsCollection.insert({
    title,
    url,
    lobby: [user._id],
    userId: user._id,
    createdAt: Date.now(),
  });
};

const SEED_USERNAME = 'kyle';
const SEED_PASSWORD = 'pass';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (ChallengesCollection.find().count() !== 6) {
    seedChallenges();
  }


  (async () => {
    // const client = piston({ server: 'https://emkc.org' });

    // const runtimes = await client.runtimes();
    // [{ language: 'python', version: '3.9.4', aliases: ['py'] }, ...]

    // const result = await client.execute('javascript', 'console.log("Hello World!")');
    // { language: 'python', version: '3.9.4', run: {
    //     stdout: 'Hello World!\n',
    //     stderr: '',
    //     code: 0,
    //     signal: null,
    //     output: 'Hello World!\n'
    // }}

    // console.log(result);
  })();
});

//
