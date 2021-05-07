import React from 'react';
import MonthlyRoutesChart from './MonthlyRoutesChart';
import SeasonalRoutesChart from './SeasonalRoutesChart';
import StateTmaxChart from './StateTmaxChart';

import './HomePage.css';

class HomePageCharts extends React.Component {
    render() {
        return (
            <div className='chart-container'>
                <StateTmaxChart className='chart'/>
                <MonthlyRoutesChart className='chart'/>
                <SeasonalRoutesChart className='chart'/>
            </div>
        );
    }
}

export default HomePageCharts;