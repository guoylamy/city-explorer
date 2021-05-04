const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- home ---- */
app.get('/home/popular_city', routes.getTop10City);
app.get('/home/route_info', routes.getTop10routes);
app.get('/home/seasonal_route', routes.getTop1Seasonroutes);
app.get('/home/monthly_route_num', routes.getMonthRouteNum);
app.get('/home/state_tmax', routes.getStateTmax);
app.get('/home/museum', routes.getTop10Museum);
/* ---- climate ---- */
app.get('/climate/getyear', routes.getyear);
app.get('/climate/getmonth', routes.getmonth);
app.get('/climate/getPlace', routes.getPlace); //{state:XX, city:XX}
app.get('/climate/time/temp_diff/:year/:month', routes.getTop10TempDiff);
app.get('/climate/time/prcp/:year/:month', routes.getTop10Prcp);
app.get('/climate/city/monthly_climate/:city/:state', routes.getCityMonthlyClimate);
app.get('/climate/city/yearly_tmax_tmin/:city/:state', routes.getCityYearlyClimate);

/* ---- humanistic ---- */
app.get('/humanistic/museum_info', routes.getTop10MuseumDetailed);
app.get('/humanistic/employ_info', routes.getTop10Unemployment);
app.get('/humanistic/income_info', routes.getTop10Income);
app.get('/humanistic/state/museum/:state', routes.getTopMuseumbyState);
app.get('/humanistic/state/college/:state', routes.getTop5countyPercCollege);
app.get('/humanistic/state/basics/:state', routes.getBasicsEachCounty);



app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});