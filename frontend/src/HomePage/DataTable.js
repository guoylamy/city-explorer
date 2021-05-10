import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DataTable(props) {
  const classes = useStyles();
  const data = props.data;
  const headers = data.length == 0 ? [] : Object.keys(data[0]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {headers.map((h, i) => {
              return <TableCell align="center" style={{color: '#3f51b5', fontWeight: 'bold'}}>{h}</TableCell>
            })}
          </TableRow>
        </TableHead>
        {/* Table Rows */}
        <TableBody>
          {data.map((row) => {
            return <TableRow key={row[Object.keys(row)[0]]}>
            {Object.entries(row).map((e) => { 
              return (<TableCell align="center">{e[1]}</TableCell>)
              }
            )}
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
