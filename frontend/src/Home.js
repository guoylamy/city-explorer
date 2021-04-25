import React from 'react';
import HomePageTabs from './HomePage/HomePageTabs';
import MapChart from './HomePage/MapChart';
import TestMap from './HomePage/TestMap';

class Home extends React.Component {
    render() {
        return (
            <div>
              <HomePageTabs/>
            </div>
        );
    }
}

export default Home;