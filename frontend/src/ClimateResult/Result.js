import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Result(row) {
  const classes = useStyles();
  const rows = row.data;
  return (
    <React.Fragment>
      <Title>City Info</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Maximum Temperature</TableCell>
            <TableCell>Minimum Temperature</TableCell>
            <TableCell align="right">Precipitation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.month}</TableCell>
              <TableCell>{row.tmax}</TableCell>
              <TableCell>{row.tmin}</TableCell>
              <TableCell align="right">{row.prcp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more cities
        </Link>
      </div>
    </React.Fragment>
  );
}