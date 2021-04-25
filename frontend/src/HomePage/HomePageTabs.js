import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import MuseumIcon from '@material-ui/icons/Museum';

import DataTable from './DataTable';
import { popular_city, popular_flights, popular_museum } from './data';
import MapChart from './MapChart';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function HomePageTabs() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{flex: 1}}>
      <AppBar position="static">
        <Tabs
            value={value} onChange={handleChange}
            style={{
                background: '#FFFFFF',
                boxShadow: 'none',
                color: 'rgb(80, 80, 80)',
            }}
            indicatorColor="primary"
            variant="fullWidth">
          <Tab label={<>Popular City<LocationCityIcon style={{paddingTop : '10'}}/></>} {...a11yProps(0)} />
          <Tab label={<>Popular Flights<FlightTakeoffIcon style={{paddingTop : '10'}}/></>} {...a11yProps(1)} />
          <Tab label={<>Popular Museums<MuseumIcon style={{paddingTop : '10'}}/></>} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <DataTable data={popular_city}/>
        <div style={{width : '80%', margin: 'auto'}}><MapChart/></div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataTable data={popular_flights}/>
        <div style={{width : '80%', margin: 'auto'}}><MapChart/></div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DataTable data={popular_museum}/>
        <div style={{width : '80%', margin: 'auto'}}><MapChart/></div>
      </TabPanel>
    </div>
  );
}