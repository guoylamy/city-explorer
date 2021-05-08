import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Title from './Title';


export default function PrecipitationResult(row) {
  const rows = row.data.map(({state_name, cnt}) => {
    return {
      State: state_name,
      Count: cnt
    }
  });
  return (
    <React.Fragment>
      <Title>Top 10 states with least number of days of precipitation</Title>
      <BarChart
          width={700}
          height={300}
          data={rows}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          style={{margin: 'auto'}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="State" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Count" fill="#8884d8" />

        </BarChart>
    </React.Fragment>
  );
}

{/* <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell align="right">Precipitation(in)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.state_name}</TableCell>
              <TableCell align="right">{row.cnt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}