import React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import TestTabs from './Tabs';

const classes = {
  root: {
    width: '100%',
    minWidth: '300px',
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: '15px',
  },
  output: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
};

export default function TestResults({ console, tests, onSubmit }) {
  const [expanded, setExpanded] = React.useState(false);
  const { challenge } = useSelector((state) => state.golf);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const customOutput =
    challenge &&
    challenge.io.tests.map((testInfo, i) => (
      <Accordion
        key={testInfo.id}
        expanded={expanded === `test${i}`}
        onChange={handleChange(`test${i}`)}
        sx={{ border: `1px solid ${tests && tests[testInfo.id].passed ? 'green' : 'red'}`, margin: '5px' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`test${i}bh-content`} id={`test${i}bh-header`}>
          <Typography sx={classes.heading}>Test {i + 1}</Typography>
          <Typography sx={classes.secondaryHeading}>
            Input: <code>{testInfo.input}</code>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={classes.secondaryHeading}>
            Expected Output: <code>{`${testInfo.output}`}</code>
          </Typography>
          {tests && tests[testInfo.id] && (
            <Typography sx={classes.secondaryHeading}>
              Your Output: <code>{`${tests[testInfo.id].output}`}</code>
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    ));

  const rawOutput = (
    <List sx={classes.output} aria-label="test-output">
      <ListItem dense={true}>
        <ListItemText primary="Console output: " />
      </ListItem>
      <Divider />
      {console &&
        Object.keys(console).map((testNum) => (
          <div key={testNum}>
            <ListItem dense={true}>
              <ListItemText primary={`----------- TEST ${testNum} -----------`} />
            </ListItem>
            {console[testNum].map((output, i) => (
              <ListItem dense={true} sx={{ color: `${tests[testNum].passed ? 'green' : 'red'}` }} key={i}>
                <ListItemText primary={JSON.stringify(output)} />
              </ListItem>
            ))}
          </div>
        ))}
    </List>
  );

  return (
    <Box sx={{ width: '100%', minWidth: '300px' }}>
      <TestTabs custom={customOutput} raw={rawOutput} onSubmit={onSubmit} />
    </Box>
  );
}
