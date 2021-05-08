import React from 'react';
import HomePageTabs from './HomePage/HomePageTabs';
import HomePageCharts from './HomePage/HomePageCharts';
import './App.css';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div class="hero-image">
                <div class="hero-text">
                    <h1>City Explorer</h1>
                    <p>Find out everything about a city</p>
                </div>
                </div>
                <div style={{margin: '3%'}}>
                <HomePageCharts/>
                <div style={{margin: '3%'}}>
                <HomePageTabs/>
                </div>
                </div>
            </div>
        );
    }
}

export default Home;