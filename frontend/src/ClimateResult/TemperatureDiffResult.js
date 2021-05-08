import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Title from './Title';

export default function TemperatureDiffResult(row) {
  const rows = row.data.map(({state, temp}) => {
    return {
      State: state,
      Difference: temp
    }
  });
  return (
    <React.Fragment>
      <Title>Top 10 states with smallest average daily temperature difference</Title>
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
          <Bar dataKey="Difference" fill="#8884d8" />

        </BarChart>
    </React.Fragment>
  );
}

{/* <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell align="right">Temperature(˚F)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.state}</TableCell>
              <TableCell align="right">{row.temp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}