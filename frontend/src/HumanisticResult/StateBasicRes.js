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
      <Title>Basic information of the state</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>County</TableCell>
            <TableCell>Population</TableCell>
            <TableCell>Perc College</TableCell>
            <TableCell>Poverty</TableCell>
            <TableCell align="right">Unempl- oyment Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rank}>
              <TableCell>{row.county}</TableCell>
              <TableCell>{row.population}</TableCell>
              <TableCell>{row.perc_college}</TableCell>
              <TableCell>{row.poverty_all}</TableCell>
              <TableCell align="right">{row.unemployed_rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}