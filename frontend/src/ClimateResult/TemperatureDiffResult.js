import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

export default function TemperatureDiffResult(row) {
  const rows = row.data;
  return (
    <React.Fragment>
      <Title>Top 10 states with smallest average daily temperature difference</Title>
      <Table size="small">
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
      </Table>
    </React.Fragment>
  );
}