import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from '../ClimateResult/Title';
import { getMonthlyRoutesNum } from '../API';

const monthMap = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class MonthlyRoutesChart extends React.Component {
    state = {
        data: []
    }
    componentDidMount() {
        getMonthlyRoutesNum.then(res => {
            let data = res.data.sort((a, b) => a.month < b.month ? -1 : (a.month > b.month ? 1 : 0));
            data = data.map(({month, route_num}) => {
                return { month: monthMap[month], route_num }
            });
            this.setState({data});
        });
    }
    render() {
        return (
            <div className='chart'>
            <Title>Number of Airlines Per Month</Title>
            <LineChart
                width={500}
                height={300}
                data={this.state.data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                style={{margin: 'auto'}}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis type="number" domain={[1450000, 1597370]}/>
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="route_num"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
            </div>
            
        );
    }
}

export default MonthlyRoutesChart;