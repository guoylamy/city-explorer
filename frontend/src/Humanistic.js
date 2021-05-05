import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuseumResult from './HumanisticResult/MuseumResult';
import EmployInfo from './HumanisticResult/EmployInfo';
import IncomeInfo from './HumanisticResult/IncomeInfo';
import StateMuseumRes from './HumanisticResult/StateMuseumRes';
import StateCollegeRes from './HumanisticResult/StateCollegeRes';
import StateBasicRes from './HumanisticResult/StateBasicRes';

const useStyles = theme => ({
  root: {
	height: '260vh',
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
			selectedState: "",
			museumRow: [],
			employRow: [],
			incomeRow: [],
			museumResult: [],
			collegeResult: [],
			basicsResult: [],
			position: []
		};
		this.getInfo = this.getInfo.bind(this);
	}
	getInfo (){
		fetch("http://localhost:8081/humanistic/state/museum/"+this.state.selectedState,{
		  method: "GET"
		})
		.then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		})
		.then(res_l => {
		  if (!res_l) return;
		  res_l = Array.from(res_l);

		  this.setState({
			museumResult: res_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	
		fetch("http://localhost:8081/humanistic/state/college/"+this.state.selectedState,{
		  method: "GET"
		})
		.then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		})
		.then(res_l => {
		  if (!res_l) return;
		  res_l = Array.from(res_l);

		  this.setState({
			collegeResult: res_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	
		fetch("http://localhost:8081/humanistic/state/basics/"+this.state.selectedState,{
		  method: "GET"
		})
		.then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		})
		.then(res_l => {
		  if (!res_l) return;
		  res_l = Array.from(res_l);

		  this.setState({
			basicsResult: res_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
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

		fetch("http://localhost:8081/climate/getPlace",{
		  method: "GET"
		})
		.then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		})
		.then(place => {
		  if (!place) return;
		  place = Array.from(place);

		  this.setState({
			position: place
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	}
	render() {
		const { classes } = this.props;
		const handleStateChange = (e) => {
			this.setState({
				selectedState: e.target.value
			});
		};
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
			  <Grid item xs={12} component={Paper} elevation={6} square>
			  	<div className={classes.paper}>
			  		<TextField
					  variant="outlined"
					  margin="normal"
					  select
					  required
					  name="state"
					  label="State"
					  type="state"
					  id="state"
					  onChange={handleStateChange}
					>
						{this.state.position.map((option) => (
							<MenuItem key={option.state} value={option.state}>
								{option.state}
							</MenuItem>
						))}
					</TextField>
					<Button
					  variant="contained"
					  color="primary"
					  onClick={this.getInfo}
					>
					  Query
					</Button>
			  		<StateMuseumRes data={this.state.museumResult}/>
			  		<StateCollegeRes data={this.state.collegeResult}/>
			  		<StateBasicRes data={this.state.basicsResult}/>
			  	</div>
			  </Grid>
			</Grid>
		);
	}
}

export default  withStyles(useStyles)(Humanistic);