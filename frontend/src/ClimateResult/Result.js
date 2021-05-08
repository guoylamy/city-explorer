import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const monthMap = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Result(row) {
  const classes = useStyles();
  const rows = row.data.map(({month, prcp, tmax, tmin}) => {
    return {
      month: monthMap[month],
      prcp: prcp*1000,
      tmax, tmin
    }
  });
  console.log('rows', rows); // [{month, prcp, tmax, tmin}]
  return (
    <div >
      <p>prcp: 10^-3 in, tmax: ˚F, tmax: ˚F</p>
        <ComposedChart
          width={800}
          height={600}
          data={rows}
          style={{margin: 'auto'}}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="tmax" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="prcp" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="tmin" stroke="#ff7300" />
        </ComposedChart>
    </div>
  );
}

    // <React.Fragment>
    //   <Title>City Info</Title>
    //   <Table size="small">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Month</TableCell>
    //         <TableCell>Maximum Temperature(˚F)</TableCell>
    //         <TableCell>Minimum Temperature(˚F)</TableCell>
    //         <TableCell align="right">Precipitation(Unit:in)</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <TableRow key={row.id}>
    //           <TableCell>{row.month}</TableCell>
    //           <TableCell>{row.tmax}</TableCell>
    //           <TableCell>{row.tmin}</TableCell>
    //           <TableCell align="right">{row.prcp}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    //   <div className={classes.seeMore}>
    //     <Link color="primary" href="#" onClick={preventDefault}>
    //       See more cities
    //     </Link>
    //   </div>
    // </React.Fragment>