import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../ClimateResult/Title';

export default function EmployInfo(row) {
  const rows = row.data;
  return (
    <React.Fragment>
      <Title>10 County with lowest percentage of unemployment rate</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>County</TableCell>
            <TableCell>State</TableCell>
            <TableCell align="center">Unemployment Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rank}>
              <TableCell>{row.county}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell align="center">{row.unemploy_rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}