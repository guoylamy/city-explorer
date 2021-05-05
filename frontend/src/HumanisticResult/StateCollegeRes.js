import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../ClimateResult/Title';

export default function IncomeInfo(row) {
  const rows = row.data;
  return (
    <React.Fragment>
      <Title>Top 5 counties of a given state which have the highest percentage of people who have at least a college degree</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>County</TableCell>
            <TableCell align="center">Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rank}>
              <TableCell>{row.county}</TableCell>
              <TableCell align="center">{row.percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}