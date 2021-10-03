import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Windows from '../components/PaneWindows';
import Rooms from '../components/Rooms';
import TestResults from '../components/TestResults/TestResults';
import ChallengesCollection from '/imports/db/Challenges';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { setChallenges, setChallenge, setResults } from '../features/golf/golfSlice';

// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
// const markdown = `Here is some JavaScript code:

// ~~~js
// // This file is initialized with a code version of this
// // question's sample test case. Feel free to add, edit,
// // or remove test cases in this file as you see fit!

// const program = require('./program');
// const chai = require('chai');

// it('Test Case #1', function () {
//   const array = [8, 5, 11, -1, 3, 4, 2];
//   const expected = [5, 4, 4, 0, 1, 1, 0];
//   const actual = program.rightSmallerThan(array);
//   chai.expect(actual).to.deep.equal(expected);
// });
// ~~~
// `;

{
  /* <ReactMarkdown
  children={markdown}
  components={{
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter children={String(children).replace(/\n$/, '')} style={darcula} language={match[1]} PreTag="div" {...props} />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  }}
/>; */
}

export default function GolfPage({ user }) {
  const dispatch = useDispatch();
  const [solution, setSolution] = useState('');
  const { challenges, challenge, results } = useSelector((state) => state.golf);
  useTracker(() => {
    let challenges = ChallengesCollection.find({}).fetch();
    dispatch(setChallenges(challenges));
    if (!challenge) {
      dispatch(setChallenge(challenges[0]))
    }
  }, []);

  useTracker(() => {
    let challengeChoice = ChallengesCollection.findOne({ _id: challenge._id });
    dispatch(setChallenge(challengeChoice));
  }, []);

  function handleEditorChange(value, event) {
    setSolution(value);
  }

  function handleChallengeClick(challenge) {
    dispatch(setChallenge(challenge));
    setSolution(challenge.source);
  }

  function handleSubmitChallenge() {
    console.log(challenge._id, solution);
    Meteor.call('challenges.submit', challenge._id, solution, (error, result) => {
      console.log('error: ', error, 'result: ', result);
      dispatch(setResults(result));
    });
  }

  const myEditor = <CodeEditor handleEditorChange={handleEditorChange} solution={solution} lang="javascript" />;

  return (
    <div>
      {
        <Windows
          topLeft={<ChallengeList challenges={challenges} handleChallengeClick={handleChallengeClick} />}
          topRight={myEditor}
          bottomLeft={<div/>}
          bottomRight={
            <TestResults
              console={results?.consoleOutput && results.consoleOutput}
              tests={results?.tests && results.tests}
              onSubmit={handleSubmitChallenge}
            />
          }
        />
      }
    </div>
  );
}

const Challenge = ({ challenge, handleChallengeClick }) => {
  return (
    <div>
      <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={() => handleChallengeClick(challenge)}>
        {challenge?.name}
      </Button>
    </div>
  );
};

const ChallengeList = ({ challenges, handleChallengeClick }) => (
  <div>
    {challenges?.map((challenge) => (
      <Challenge key={challenge._id} challenge={challenge} handleChallengeClick={handleChallengeClick} />
    ))}
  </div>
);