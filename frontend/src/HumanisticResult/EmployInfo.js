import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(rank, county, state, unemploy_r) {
  return { rank, county, state, unemploy_r };
}

const rows = [
  createData(1, '', '', '10'),
];

export default function EmployInfo() {
  return (
    <React.Fragment>
      <Title>10 County with lowest percentage of unemployment rate</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>County</TableCell>
            <TableCell>State</TableCell>
            <TableCell align="center">Unemployment Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rank}>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.county}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell align="center">{row.unemploy_r}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}