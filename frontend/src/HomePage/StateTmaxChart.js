import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from '../ClimateResult/Title';
import { getStateTmax } from '../API';

class StateTmaxChart extends React.Component {
    state = {
        data: []
    }
    componentDidMount() {
        getStateTmax.then(res => {
            this.setState({data : res.data});
        });
    }

    render() {
        return (
            <div className='chart'>
            <Title>States with Most Hits of the Highest Temperature</Title>
            <BarChart
            width={500}
            height={300}
            data={this.state.data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            style={{margin: 'auto'}}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state_name" />
            <YAxis dataKey='cnt'/>
            <Tooltip />
            <Legend />
            <Bar dataKey="cnt" fill="#8884d8" />
            </BarChart>
            </div>
        );
    }
}

export default StateTmaxChart;