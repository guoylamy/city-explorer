import React, { useState, useEffect } from 'react';
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
import { getPopularCity, getPopularFlights, getPopularMuseums } from '../API';
import MapChart from './MapChart';

import './HomePage.css';

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

  const [popularCity, setPopularCity] = useState([]);
  const [popularFlights, setPopularFlights] = useState([]);
  const [popularMuseums, setPopularMuseums] = useState([]);
  const [cityMarkers, setCityMarkers] = useState([]);
  const [flightMarkers, setFlightMarkers] = useState([]);
  const [museumMarkers, setMuseumMarkers] = useState([]);

  // { markerOffset: 15, name: city,  coordinates: [longitude, latitude]}
  useEffect(() => {
    getPopularCity.then(res => {
      setPopularCity(res.data.map(({city, state, Total_passengers, most_visted_airport}) => {
        return {
          City: city,
          State: state,
          Passengers: Total_passengers,
          'Most Popular Airport': most_visted_airport
        }
      }));
      setCityMarkers(res.data.map(({city, latitude, longitude}) => { 
        return { markerOffset: 15, name: city,  coordinates: [longitude, latitude]}
      }));
    });
    getPopularFlights.then(res => {
      console.log(res.data);
      setPopularFlights(res.data.map(({src_airport, SourceCity, SourceState, dst_airport, DestCity, DestState, passenger_num}) => {
        return {
          'Src City': SourceCity,
          'Src State': SourceState,
          'Src Airport': src_airport,
          'Dst City': DestCity,
          'Dst State': DestState,
          'Dst Airport': dst_airport,
          'Passengers': passenger_num
        }
      }));
      setFlightMarkers(res.data.flatMap(({dst_airport, src_airport, dst_latitude, dst_longitude, src_latitude, src_longitude}) => [
        {markerOffset: 15, name: dst_airport, coordinates: [dst_longitude, dst_latitude]},
        {markerOffset: 15, name: src_airport, coordinates: [src_longitude, src_latitude]}
      ]));
    });
    getPopularMuseums.then(res => {
      setPopularMuseums(res.data.map(({museum_name, city, state	}) => {
        return {
          Museum: museum_name,
          City: city,
          State: state
        }
      }));
      console.log('museums', res.data);
      setMuseumMarkers(res.data.map(({museum_name, latitude, longitude}) => {
        return {
          markerOffset: 15,
          name: museum_name,
          coordinates: [longitude, latitude]
        }
      }));
    });
    console.log('museum markers', museumMarkers);
  }, []);
  
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
        <DataTable data={popularCity}/>
        <div className='map'>
          <MapChart markers={cityMarkers}/>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataTable data={popularFlights}/>
        <div className='map'>
          <MapChart markers={flightMarkers}/>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DataTable data={popularMuseums}/>
        <div className='map'>
          <MapChart markers={museumMarkers}/>
        </div>
      </TabPanel>
    </div>
  );
}