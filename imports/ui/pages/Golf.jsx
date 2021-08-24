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
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, blue, red } from '@material-ui/core/colors';

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
