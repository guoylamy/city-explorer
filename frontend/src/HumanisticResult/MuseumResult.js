import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../ClimateResult/Title';

// Generate Order Data
function createData(rank, name, city, state, address, description, length_of_visit, fee, phone) {
  return { rank, name, city, state, address, description, length_of_visit, fee, phone };
}

const rows = [
  createData(1, '16 Mar, 2019', '-3', '31', '110', 'NULL'),
];

export default function Result() {
  return (
    <React.Fragment>
      <Title>Top 10 (rank) museum info</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Museum Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Length_of_visit</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rank}>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.length_of_visit}</TableCell>
              <TableCell>{row.fee}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}