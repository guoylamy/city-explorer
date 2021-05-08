const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cors({credentials: true, origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- home ---- */
app.get('/api/home/popular_city', routes.getTop10City);
app.get('/api/home/route_info', routes.getTop10routes);
app.get('/api/home/seasonal_route', routes.getTop1Seasonroutes);
app.get('/api/home/monthly_route_num', routes.getMonthRouteNum);
app.get('/api/home/state_tmax', routes.getStateTmax);
app.get('/api/home/museum', routes.getTop10Museum);
app.get('/api/getState', routes.getState);
app.get('/api/getCity/:state', routes.getCitybyState);
/* ---- climate ---- */
app.get('/api/climate/getyear', routes.getyear);
app.get('/api/climate/getmonth', routes.getmonth);
app.get('/api/climate/getPlace', routes.getPlace); //{state:XX, city:XX}
app.get('/api/climate/time/temp_diff/:year/:month', routes.getTop10TempDiff);
app.get('/api/climate/time/prcp/:year/:month', routes.getTop10Prcp);
app.get('/api/climate/city/monthly_climate/:city/:state', routes.getCityMonthlyClimate);
app.get('/api/climate/city/yearly_tmax_tmin/:city/:state', routes.getCityYearlyClimate);

/* ---- humanistic ---- */
app.get('/api/humanistic/museum_info', routes.getTop10MuseumDetailed);
app.get('/api/humanistic/employ_info', routes.getTop10Unemployment);
app.get('/api/humanistic/income_info', routes.getTop10Income);
app.get('/api/humanistic/state/museum/:state', routes.getTopMuseumbyState);
app.get('/api/humanistic/state/college/:state', routes.getTop5countyPercCollege);
app.get('/api/humanistic/state/basics/:state', routes.getBasicsEachCounty);



app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});