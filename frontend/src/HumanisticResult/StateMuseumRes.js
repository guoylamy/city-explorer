import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../ClimateResult/Title';

export default function Result(row) {
  const rows = row.data;
  return (
    <React.Fragment>
      <Title>Museum info in the given state</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Museum Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Length of visit</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rank}>
              <TableCell>{row.museum_name}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.length_of_visit}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}