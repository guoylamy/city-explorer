import React from 'react';
import HomePageTabs from './HomePage/HomePageTabs';
import HomePageCharts from './HomePage/HomePageCharts';

class Home extends React.Component {
    render() {
        return (
            <div>
              <HomePageTabs/>
              <HomePageCharts/>
            </div>
        );
    }
}

export default Home;