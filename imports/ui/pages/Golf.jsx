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
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { setChallenges, setChallenge, setResults } from '../features/golf/golfSlice';

// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

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
    Meteor.call('challenges.submit', challenge._id, solution);
  }

  const myEditor = <CodeEditor handleEditorChange={handleEditorChange} solution={solution} lang="javascript" />;

  const panes = (
    <Windows
      topLeft={<ChallengeList challenges={challenges} handleChallengeClick={handleChallengeClick} />}
      topRight={myEditor}
      bottomLeft={<TestList consoleOutput={challenge?.consoleOutput} />}
      bottomRight={
        <>
          <Results onSubmit={handleSubmitChallenge} />
          <TestResults challenge={challenge} />
        </>
      }
    />
  );

  return <div>{panes}</div>;
}

const Results = ({ onSubmit }) => {
  const classes = useStyles();
  return (
    <div>
      <h1> Results </h1>
      <ColorButton variant="contained" color="primary" className={classes.margin} onClick={() => onSubmit()}>
        Submit
      </ColorButton>
    </div>
  );
};

const Challenge = ({ challenge, handleChallengeClick }) => {
  const classes = useStyles();
  return (
    <div>
      <ColorButton variant="contained" color="primary" className={classes.margin} onClick={() => handleChallengeClick(challenge)}>
        {challenge.name}
      </ColorButton>
    </div>
  );
};

const ChallengeList = ({ challenges, handleChallengeClick }) => (
  <div>
    {challenges.map((challenge) => (
      <Challenge key={challenge._id} challenge={challenge} handleChallengeClick={handleChallengeClick} />
    ))}
  </div>
);

const Test = ({ test, output }) => {
  const classes = useStyles();
  return (
    <div>
      <ColorButton className={classes.margin}>
        Test {test}: {`${output}`}
      </ColorButton>
    </div>
  );
};

const TestList = ({ consoleOutput }) => (
  <div>
    {consoleOutput?.map(({ test, output }, i) => (
      <Test key={i} test={test} output={output} />
    ))}
  </div>
);
