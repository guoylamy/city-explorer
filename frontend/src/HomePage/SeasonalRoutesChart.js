import React from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import Title from '../ClimateResult/Title';

import { getSeasonalRoutes } from '../API';

class SeasonalRoutesChart extends React.Component {
    state = {
        data: []
    };
    componentDidMount() {
        getSeasonalRoutes.then(res => {
            let data = res.data.map(({season, passenger_num}) => {
                return {
                    name: season,
                    value: passenger_num
                }
            })
            this.setState({data});
        })
    }
    render() {
        return (
            <div className='chart'>
            <Title>Passengers of Most Popular Route Per Season</Title>
            <PieChart width={500} height={300} style={{margin: 'auto'}} >
            <Pie dataKey="value" data={this.state.data} cx={250} cy={150} innerRadius={40} outerRadius={80} fill="#8884d8" label={(data) => data.payload.value.toLocaleString()}/>
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
            </PieChart>
            </div>
        );
    }
}

export default SeasonalRoutesChart;