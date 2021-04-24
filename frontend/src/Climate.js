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
import Result from './ClimateResult/Result';
import PrecipitationResult from './ClimateResult/PrecipitationResult';
import TemperatureDiffResult from './ClimateResult/TemperatureDiffResult';

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
	height: '170vh',
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
  submit: {
	margin: theme.spacing(3, 0, 15),
  },
  result: {
  	padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
  },
});

class Climate extends React.Component {
	render() {
		const { classes } = this.props;
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
					City Overview
				  </Typography>
				  <form className={classes.form} noValidate>
					<TextField
					  variant="outlined"
					  margin="normal"
					  required
					  fullWidth
					  id="city"
					  label="City"
					  name="city"
					  autoComplete="email"
					  autoFocus
					/>
					<TextField
					  variant="outlined"
					  margin="normal"
					  required
					  fullWidth
					  name="date"
					  label="Date"
					  type="date"
					  defaultValue="2021-04-25"
					  id="date"
					  autoComplete="date"
					/>
					<Button
					  type="submit"
					  fullWidth
					  variant="contained"
					  color="primary"
					  className={classes.submit}
					>
					  City Overview
					</Button>
				  	<Result />
				  </form>
				</div>
			  </Grid>
			  <Grid item xs={12} className={classes.rainImg} />
			  <Grid item xs={6} component={Paper} elevation={6} square>
			  	<PrecipitationResult />
			  </Grid>
			  <Grid item xs={6} component={Paper} elevation={6} square>
			  	<TemperatureDiffResult />
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