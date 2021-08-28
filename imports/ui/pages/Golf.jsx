import React, { useState } from 'react';
import CodeEditor from '../Components/CodeEditor';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Windows from '../Components/PaneWindows';
import Rooms from '../Components/Rooms';
import ChallengesCollection from '/imports/db/challenges';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
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
  const [solution, setSolution] = useState('');
  const [challenge, setChallenge] = useState({});
  const dispatch = useDispatch();
  const challenges = useTracker(() => {
    return ChallengesCollection.find({}).fetch();
  });

  console.log(challenge);

  function handleEditorChange(value, event) {
    setSolution(value);
  }

  function handleChallengeClick(challenge) {
    setChallenge(challenge);
    setSolution(challenge.solution);
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
      bottomLeft={<TestList tests={challenge?.testDescriptions && JSON.parse(challenge.testDescriptions)} />}
      bottomRight={<Results onSubmit={handleSubmitChallenge} />}
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
        {challenge.title}
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

const Test = ({ test }) => {
  const classes = useStyles();
  return (
    <div>
      <ColorButton color="primary" className={classes.margin}>
        {test}
      </ColorButton>
    </div>
  );
};

const TestList = ({ tests }) => <div>{tests && tests.map((test, i) => <Test key={i} test={test} />)}</div>;
