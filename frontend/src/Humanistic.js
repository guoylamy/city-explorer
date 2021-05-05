import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MuseumResult from './HumanisticResult/MuseumResult';
import EmployInfo from './HumanisticResult/EmployInfo';
import IncomeInfo from './HumanisticResult/IncomeInfo';

const useStyles = theme => ({
  root: {
	height: '210vh',
  },
  image: {
	backgroundImage: 'url(https://images.unsplash.com/photo-1560425946-7d5830202765?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fG11c2V1bXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60)',
	backgroundRepeat: 'no-repeat',
	backgroundColor:
	  theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
	backgroundSize: 'cover',
	backgroundPosition: 'center',
  },
  paper: {
	margin: theme.spacing(8, 4),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
  },
  form: {
	width: '100%', // Fix IE 11 issue.
	marginTop: theme.spacing(1),
  },
  space: {
	margin: theme.spacing(1,0,1),
  },
  title: {
    flexGrow: 1,
  },
  employImg:{
  	backgroundImage: 'url(https://images.unsplash.com/photo-1485217988980-11786ced9454?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60)',
	backgroundRepeat: 'no-repeat',
	backgroundColor:
	  theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
	backgroundSize: 'cover',
	backgroundPosition: 'center',
  },
  incomeImg:{
  	backgroundImage: 'url(https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aW5jb21lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60)',
	backgroundRepeat: 'no-repeat',
	backgroundColor:
	  theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
	backgroundSize: 'cover',
	backgroundPosition: 'center',
  }
});

class Humanistic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  museumRow: [],
		  employRow: [],
		  incomeRow: []
		};
	}
	componentDidMount() {
		fetch("http://localhost:8081/humanistic/museum_info",{
		  method: "GET"
		})
		.then(res => {
		    return res.json();
		}, err => {
		  console.log(err);
		})
		.then(museum_l => {
		  if (!museum_l) return;
		  museum_l = Array.from(museum_l);

		  this.setState({
		    museumRow: museum_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});

		fetch("http://localhost:8081/humanistic/employ_info",{
		  method: "GET"
		})
		.then(res => {
		    return res.json();
		}, err => {
		  console.log(err);
		})
		.then(employ_l => {
		  if (!employ_l) return;
		  employ_l = Array.from(employ_l);

		  this.setState({
		    employRow: employ_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});

		fetch("http://localhost:8081/humanistic/income_info",{
		  method: "GET"
		})
		.then(res => {
		    return res.json();
		}, err => {
		  console.log(err);
		})
		.then(income_l => {
		  if (!income_l) return;
		  income_l = Array.from(income_l);

		  this.setState({
		    incomeRow: income_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	}
	render() {
		const { classes } = this.props;
		return (
			<Grid container component="main" className={classes.root}>
			  <CssBaseline />
			  <Grid item xs={false} sm={4} md={4} className={classes.image} />
			  <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
				<div className={classes.paper}>
				  <Typography component="h1" variant="h5">
					Museum
				  </Typography>
				  <MuseumResult data={this.state.museumRow}/>
				</div>
			  </Grid>
			  <Grid item xs={12} className={classes.space} />
			  <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
				<div className={classes.paper}>
				  <Typography component="h1" variant="h5">
					Employment
				  </Typography>
				  <EmployInfo data={this.state.employRow}/>
				</div>
			  </Grid>
			  <Grid item xs={false} sm={4} md={4} className={classes.employImg} />
			  <Grid item xs={12} className={classes.space} />
			  <Grid item xs={false} sm={4} md={4} className={classes.incomeImg} />
			  <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
				<div className={classes.paper}>
				  <Typography component="h1" variant="h5">
					Income
				  </Typography>
				  <IncomeInfo data={this.state.incomeRow}/>
				</div>
			  </Grid>
			</Grid>
		);
	}
}

export default  withStyles(useStyles)(Humanistic);