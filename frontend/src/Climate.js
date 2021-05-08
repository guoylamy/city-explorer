import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Result from './ClimateResult/Result';
import PrecipitationResult from './ClimateResult/PrecipitationResult';
import TemperatureDiffResult from './ClimateResult/TemperatureDiffResult';
import WeatherCard from './ClimateResult/WeatherCard';
import { CardColumns } from "react-bootstrap";
import { grey } from '@material-ui/core/colors';
import { uri } from './API';

function Copyright() {
  return (
	<Typography variant="body2" color="textSecondary" align="center">
	  {'Copyright © '}
	  <Link color="inherit" href="https://material-ui.com/">
		Climate Website
	  </Link>{' '}
	  {new Date().getFullYear()}
	  {'.'}
	</Typography>
  );
}

const useStyles = theme => ({
  root: {
	height: '230vh',
  },
  rainImg: {
	backgroundImage: 'url(https://images.unsplash.com/photo-1619233651146-7364c945c3ee?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60)',
	backgroundRepeat: 'no-repeat',
	backgroundColor:
	  theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	margin: theme.spacing(3, 0, 3),
  },
  image: {
	backgroundImage: 'url(https://images.unsplash.com/photo-1619203596659-6029850f0c73?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60)',
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
  avatar: {
	margin: theme.spacing(1),
	backgroundColor: theme.palette.secondary.main,
  },
  form: {
	width: '100%', // Fix IE 11 issue.
	marginTop: theme.spacing(1),
  },
  form1: {
  	margin: theme.spacing(1),
  	alignItems: 'center',
  	display: 'flex'
  },
  submit: {
	margin: theme.spacing(3, 0, 15),
  },
  result: {
	padding: theme.spacing(2),
	display: 'flex',
	overflow: 'auto',
	flexDirection: 'row',
  },
  singleWeatherCard: {
	display: 'flex',
	justifyContent: 'space-around',
	backgroundColor: "#DCDBDC",
	boxSizing: "border-box",
  },
  searchBox: {
  	marginLeft:theme.spacing(2),
  },
  firstBox: {
  	marginLeft:theme.spacing(28),
  }
});

class Climate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			climateCity:"",
			climateState:"",
			precYear:"",
			precMonth:"",
			tempYear:"",
			tempMonth:"",
			forecastCity:"",
			forecastZip:"",
			displayForecastCity:"",
			climateR: [],
			precR: [],
			tempR: [],
			weatherapiKey: "182d6cd6eca58af2af3d43c704b7657b",
			forecastData: [],
			forecastDailyData: [],
			year: [],
			month: [],
			position: [],
			city_position: []
		};

		this.getClimateResult = this.getClimateResult.bind(this);
		this.getPrecResult = this.getPrecResult.bind(this);
		this.getTempResult = this.getTempResult.bind(this);
		this.getWeatherForcast = this.getWeatherForcast.bind(this);
		this.getWeatherForecastbyZip = this.getWeatherForecastbyZip.bind(this);
		this.getRelatedCity = this.getRelatedCity.bind(this);
	}

	getClimateResult (){
		fetch(uri + "/climate/city/monthly_climate/"+this.state.climateCity+"/"+this.state.climateState,{
		  method: "GET"
		})
		.then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		})
		.then(climate_l => {
		  if (!climate_l) return;
		  climate_l = Array.from(climate_l);

		  this.setState({
			climateR: climate_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	}
	getPrecResult (){
		fetch(uri + "/climate/time/prcp/"+this.state.precYear+"/"+this.state.precMonth,{
		  method: "GET"
		})
		.then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		})
		.then(climate_l => {
		  if (!climate_l) return;
		  climate_l = Array.from(climate_l);

		  this.setState({
			precR: climate_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	}
	getTempResult (){
		fetch(uri + "/climate/time/temp_diff/"+this.state.tempYear+"/"+this.state.tempMonth,{
		  method: "GET"
		})
		.then(res => {
			return res.json();
		}, err => {
		  console.log(err);
		})
		.then(climate_l => {
		  if (!climate_l) return;
		  climate_l = Array.from(climate_l);

		  this.setState({
			tempR: climate_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	}
	componentDidMount() {
		fetch(uri + "/climate/getyear",{
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
			year: museum_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
		fetch(uri + "/climate/getmonth",{
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
			month: museum_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
		fetch(uri + "/getstate",{
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

	getWeatherForcast() {
		if (this.state.forecastCity == null || this.state.forecastCity == '') {
			this.setState({displayForecastCity: "Please type in a city!"});
			return;
		}
		fetch("http://api.openweathermap.org/data/2.5/forecast?q="+this.state.forecastCity + "&appid=" + this.state.weatherapiKey,{
			method: "GET"
		})
		.then(res => {
            if (res.status > 400) {
				return null;
			} else {
				return res.json();
			}
		}, err => {
		  console.log("error", err);
		  return null;
		})
		.then(data => 
			{
				if (data == null){
					this.setState({
						displayForecastCity: "Could not find that City!",
						forecastData: [],
						forecastDailyData: [],
					})
				} else {
					const dailyData = data.list.filter(reading => {return reading.dt_txt.includes("00:00:00")})
			        this.setState({
				        forecastData: data.list,
    					forecastDailyData: dailyData,
						displayForecastCity: this.state.forecastCity	
	    		    })
				}
				
		    }
		  )
	}

	getWeatherForecastbyZip() {
		if (this.state.forecastZip == null || this.state.forecastZip == '') {
			this.setState({displayForecastCity: "Please type in a zipcode!"});
			return;
		}
		fetch("http://api.openweathermap.org/data/2.5/forecast?zip="+this.state.forecastZip + ",us&appid=" + this.state.weatherapiKey,{
			method: "GET"
		})
		.then(res => {
		    if (res.status > 400) {
				return null;
			} else {
				return res.json();
			}
		}, err => {
		  console.log("error", err);
		  return null;
		})
		.then(data => 
			{
				if (data == null){
					this.setState({
						displayForecastCity: "Could not find that Zip!",
						forecastData: [],
						forecastDailyData: [],
					})
				} else {
					const dailyData = data.list.filter(reading => {return reading.dt_txt.includes("00:00:00")})
					this.setState({
						forecastData: data.list,
						forecastDailyData: dailyData,
						displayForecastCity: this.state.forecastZip
					})
				}				
		    }
		  )
	}

	forecastDailyWeatherCards = () => {
		console.log(this.state.forecastDailyData);
		return this.state.forecastDailyData.map((data, index) => <WeatherCard data={data} key={index} />)
	}

	getRelatedCity(value) {
		fetch(uri + "/getcity/" + value,{
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
			city_position: place
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	}

	render() {
		const { classes } = this.props;
		const handleCityChange = (e) => {
			this.setState({
				climateCity: e.target.value
			});
		};
		const handleStateChange = (e) => {
			this.setState({
				climateState: e.target.value
			});
			this.getRelatedCity(e.target.value);
		};
		const handlePrecYearChange = (e) => {
			this.setState({
				precYear: e.target.value
			});
		};
		const handlePrecMonthChange = (e) => {
			this.setState({
				precMonth: e.target.value
			});
		};
		const handleTempYearChange = (e) => {
			this.setState({
				tempYear: e.target.value
			});
		};
		const handleTempMonthChange = (e) => {
			this.setState({
				tempMonth: e.target.value
			});
		};

		const handleWeatherForecastState = (e) => {
			this.setState({
				forecastCity: e.target.value
			});
		};

		const handleWeatherForecastZip = (e) => {
			this.setState({
				forecastZip: e.target.value
			})
		}

		return (
			<Grid container component="main" className={classes.root}>
			  <CssBaseline />
			  <Grid item xs={false} sm={4} md={5} className={classes.image} />
			  <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
				<div className={classes.paper}>
				  <Avatar className={classes.avatar}>
					<Brightness5Icon />
				  </Avatar>
				  <Typography component="h1" variant="h5">
					City Monthly Weather Overview
				  </Typography>
				  <form className={classes.form} noValidate>
					<TextField
					  variant="outlined"
					  margin="normal"
					  select
					  required
					  fullWidth
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
					<TextField
					  variant="outlined"
					  margin="normal"
					  select
					  required
					  fullWidth
					  id="city"
					  label="City"
					  name="city"
					  onChange={handleCityChange}
					  autoFocus
					>
						{this.state.city_position.map((option) => (
							<MenuItem key={option.city} value={option.city}>
								{option.city}
							</MenuItem>
						))}
					</TextField>
					<Button
					  fullWidth
					  variant="contained"
					  color="primary"
					  className={classes.submit}
					  onClick={this.getClimateResult}
					>
					  Get Overview
					</Button>
					<Result data={this.state.climateR}/>
				  </form>
				</div>
			  </Grid>
			  <Grid item xs={12} className={classes.rainImg} />
			  <Grid item xs={6} component={Paper} elevation={6} square>
				<form1 className={classes.form1} noValidate>
					<firstBox className={classes.firstBox} noValidate>
						<TextField
						  select
						  required
						  id="month"
						  label="Month"
						  helperText="Please select month"
						  onChange={handlePrecMonthChange}
						>
							{this.state.month.map((option) => (
								<MenuItem key={option.month} value={option.month}>
									{option.month}
								</MenuItem>
							))}
						</TextField>
					</firstBox>
					<searchBox className={classes.searchBox} noValidate>
						<TextField
						  select
						  required
						  name="year"
						  label="Year"
						  type="year"
						  id="year"
						  helperText="Please select year"
						  onChange={handlePrecYearChange}
						>
							{this.state.year.map((option) => (
								<MenuItem key={option.year} value={option.year}>
									{option.year}
								</MenuItem>
							))}
						</TextField>
					</searchBox>
					<searchBox className={classes.searchBox} noValidate>
						<Button
						  variant="contained"
						  color="primary"
						  onClick={this.getPrecResult}
						>
						  Query
						</Button>
					</searchBox>	
				</form1>
				<PrecipitationResult data={this.state.precR}/>
			  </Grid>
			  <Grid item xs={6} component={Paper} elevation={6} square>
				<form1 className={classes.form1} noValidate>
					<firstBox className={classes.firstBox} noValidate>
						<TextField
						  select
						  required
						  id="month"
						  label="Month"
						  name="month"
						  helperText="Please select month"
						  onChange={handleTempMonthChange}
						>
							{this.state.month.map((option) => (
								<MenuItem key={option.month} value={option.month}>
									{option.month}
								</MenuItem>
							))}
						</TextField>
					</firstBox>
					<searchBox className={classes.searchBox} noValidate>
						<TextField
						  select
						  required
						  name="year"
						  label="Year"
						  type="year"
						  id="year"
						  helperText="Please select year"
						  onChange={handleTempYearChange}
						>
							{this.state.year.map((option) => (
								<MenuItem key={option.year} value={option.year}>
									{option.year}
								</MenuItem>
							))}
						</TextField>
					</searchBox>
					<searchBox className={classes.searchBox} noValidate>
						<Button
						  variant="contained"
						  color="primary"
						  onClick={this.getTempResult}
						>
						  Query
						</Button>
					</searchBox>
				</form1>
				<TemperatureDiffResult data={this.state.tempR}/>
			  </Grid>
			  <Grid item xs = {12} component={Paper} elevation={6} square style={{marginTop: '3%'}}>
			    <form className={classes.form1} noValidate style={{margin: 'auto'}}>
			        <TextField
					  variant="outlined"
					  margin="normal"
					  required
					  name="city"
					  label="city"
					  id="forecastcity"
					  onChange={handleWeatherForecastState}
					/>
					<Button
					  variant="contained"
					  color="primary"
					  onClick={this.getWeatherForcast}
					>
						Search
					</Button>
					<TextField
					  variant="outlined"
					  margin="normal"
					  required
					  name="zip"
					  label="zip"
					  id="forecastzip"
					  onChange={handleWeatherForecastZip}
					/>
					<Button
					  variant="contained"
					  color="primary"
					  onClick={this.getWeatherForecastbyZip}
					>
						Search
					</Button>
				</form>
			        
				<div className="weatherForecastData">
                    <h1 className="weatherForecastTitle">5-Day Weather Forecast</h1>
                    <h5 className="displayWeatherForecastCity">{this.state.displayForecastCity}</h5>
					<div className={classes.singleWeatherCard}>
                        {this.forecastDailyWeatherCards()}
					</div>
                </div>
			  </Grid>

			  <Grid item xs={12}>
				<Box mt={4}>
					<Copyright />
				</Box>
			  </Grid>
			</Grid>
		);
	}
}

export default  withStyles(useStyles)(Climate);