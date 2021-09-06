import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from './styles';

export default function TestResults({ challenge }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const testInfo = challenge?.io?.tests?.map((testInfo, i) => (
    <Accordion expanded={expanded === `test${testInfo.id}`} onChange={handleChange(`test${testInfo.id}`)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`test${i}bh-content`} id={`test${i}bh-header`}>
        <Typography className={classes.heading}>Test {testInfo.id}</Typography>
        <Typography className={classes.secondaryHeading}>
          Input: <code>{testInfo.input}</code>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Expected output: <code>{`${testInfo.output}`}</code>
        </Typography>
      </AccordionDetails>
    </Accordion>
  ));

  //   const mockResults =
  //     tests &&
  //     tests.map((test, i) => (
  //       <Accordion expanded={expanded === `test${i + 1}`} onChange={handleChange(`test${i + 1}`)}>
  //         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`test${i}bh-content`} id={`test${i}bh-header`}>
  //           <Typography className={classes.heading}>Test {i + 1}</Typography>
  //           <Typography className={classes.secondaryHeading}>{test.description}</Typography>
  //         </AccordionSummary>
  //         <AccordionDetails>
  //           <Typography>{test.test}</Typography>
  //         </AccordionDetails>
  //       </Accordion>
  //     ));

  return <div className={classes.root}> {testInfo} </div>;
}