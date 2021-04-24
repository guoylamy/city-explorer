import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, maxT, minT, precipitation, extreme) {
  return { id, date, maxT, minT, precipitation, extreme };
}

const rows = [
  createData(0, '16 Mar, 2019', '-3', '31', '110', 'NULL'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Result() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>City Info</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Maximum Temperature</TableCell>
            <TableCell>Minimum Temperature</TableCell>
            <TableCell>Precipitation</TableCell>
            <TableCell align="right">Occurrence Of Extreme Weather</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.maxT}</TableCell>
              <TableCell>{row.minT}</TableCell>
              <TableCell>{row.precipitation}</TableCell>
              <TableCell align="right">{row.extreme}</TableCell>
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