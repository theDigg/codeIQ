import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import TestTabs from './Tabs';

export default function TestResults({ console, tests }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { challenge } = useSelector((state) => state.golf);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const customOutput =
    challenge &&
    challenge.io.tests.map((testInfo, i) => (
      <Accordion
        expanded={expanded === `test${i}`}
        onChange={handleChange(`test${i}`)}
        style={{ border: `1px solid ${tests && tests[testInfo.id].passed ? 'green' : 'red'}`, margin: '5px' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`test${i}bh-content`} id={`test${i}bh-header`}>
          <Typography className={classes.heading}>Test {i + 1}</Typography>
          <Typography className={classes.secondaryHeading}>
            Input: <code>{testInfo.input}</code>
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography className={classes.secondaryHeading}>
            Expected Output: <code>{`${testInfo.output}`}</code>
          </Typography>
          {tests && tests[testInfo.id] && (
            <Typography className={classes.secondaryHeading}>
              Your Output: <code>{`${tests[testInfo.id].output}`}</code>
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    ));

  const rawOutput = (
    <List className={classes.output} aria-label="test-output">
      <ListItem dense={true}>
        <ListItemText primary="Console output: " />
      </ListItem>
      <Divider />
      {console &&
        Object.keys(console).map((testNum) => (
          <>
            <ListItem dense={true}>
              <ListItemText primary={`----------- TEST ${testNum} -----------`} />
            </ListItem>
            {console[testNum].map((output) => (
              <ListItem dense={true} style={{ color: `${tests[testNum].passed ? 'green' : 'red'}` }}>
                <ListItemText primary={JSON.stringify(output)} />
              </ListItem>
            ))}
          </>
        ))}
    </List>
  );

  return (
    <div className={classes.root}>
      <TestTabs custom={customOutput} raw={rawOutput} />
    </div>
  );
}
