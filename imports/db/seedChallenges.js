/* eslint-disable */
import Challenges from './Challenges';
import challenges from './challenges.json';

export default () => {
  challenges.forEach((challenge) => {
    // Challenges.schema.validate(challenge)
    Challenges.insert(challenge, (err, docs) => {
      if (err) console.log(err);
      // console.log(docs);
    });
  });
};