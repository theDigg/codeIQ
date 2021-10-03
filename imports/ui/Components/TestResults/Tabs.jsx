import React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TestTabs({ custom, raw, onSubmit }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <AppBar position="sticky" color="default">
        <Toolbar variant="dense" disableGutters>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="standard"
            aria-label="full width tabs example"
            sx={{ flexGrow: 1 }}
          >
            <Tab label="Tests" {...a11yProps(0)} />
            <Tab label="Output" {...a11yProps(1)} />
          </Tabs>
          <Button variant="contained" sx={{ mr: 1 }} onClick={onSubmit}>
            Submit
          </Button>
        </Toolbar>
      </AppBar>

      <TabPanel value={value} index={0}>
        {custom}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {raw}
      </TabPanel>
    </div>
  );
}
