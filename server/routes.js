const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

// CREATE VIEW airplane_route_dst_info AS(
//   SELECT airport_code, city, state, p_num 
//   FROM (SELECT dst_airport, SUM(passengers) AS p_num FROM Airplane_Route GROUP BY dst_airport) r 
//   JOIN Airport a ON r.dst_airport = a.airport_code);
// CREATE VIEW mostVisited_city AS(
//   SELECT state, city, SUM(p_num) AS total_p_num
//   FROM airplane_route_dst_info
//   GROUP BY state, city
//   ORDER BY SUM(p_num) DESC
//   LIMIT 10);
// CREATE VIEW city_airport_info AS(SELECT * FROM  airplane_route_dst_info a NATURAL JOIN mostVisited_city m);
/* ---- home (1. top 10 popular city and the corresponding airport) ---- */
const getTop10City = (req, res) => {
  var query = `
  SELECT city, state, total_p_num AS Total_passengers, airport_code AS most_visted_airport, latitude, longitude
  FROM city_airport_info c1 NATURAL JOIN (SELECT city, state_id AS state, latitude, longtitude AS longitude FROM City_State NATURAL JOIN City_Name GROUP BY city, state_id) ll
  WHERE p_num >=ALL(SELECT p_num FROM city_airport_info c2 WHERE c1.city=c2.city AND c1.state=c2.state)
  ORDER BY total_p_num DESC;
  `;
connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});
};



/* ---- home (2. top 10 popular routes) ---- */
// CREATE VIEW cityStateLatLon AS(
//   SELECT latitude, longtitude AS longitude, city, state_id
//   FROM City_State NATURAL JOIN City_Name);

const getTop10routes = (req, res) => {
  var query = `
  SELECT src_airport, SourceCity, SourceState, src_latitude, src_longitude,
  dst_airport, DestCity, DestState,latitude AS dst_latitude, longitude AS dst_longitude, passenger_num
  FROM
  (SELECT src_airport, SourceCity, SourceState, latitude AS src_latitude, longitude AS src_longitude,
  dst_airport, DestCity,DestState, passenger_num
  FROM(
  SELECT src_airport, a1.city AS SourceCity, a1.state AS SourceState,
  dst_airport, a2.city AS DestCity, a2.state AS DestState, SUM(passengers) AS passenger_num
  FROM Airplane_Route r JOIN Airport a1 ON r.src_airport = a1.airport_code 
  JOIN Airport a2 ON r.dst_airport = a2.airport_code
  GROUP BY src_airport, dst_airport
  ORDER BY SUM(passengers) DESC
  LIMIT 10) t1
  JOIN cityStateLatLon ON t1.SourceCity=cityStateLatLon.city AND t1.SourceState=cityStateLatLon.state_id) t2
  JOIN cityStateLatLon ON t2.DestCity=cityStateLatLon.city AND t2.DestState=cityStateLatLon.state_id;
  `;
connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});
};

// CREATE VIEW airport_season AS(
//   SELECT *, COALESCE(
//     CASE WHEN month(fly_date)<=2 OR month(fly_date)=12 THEN 'winter' ELSE NULL END,
//     CASE WHEN month(fly_date)>=3 AND month(fly_date)<=5 THEN 'spring' ELSE NULL END,
//     CASE WHEN month(fly_date)>=6 AND month(fly_date)<=8 THEN 'summer' ELSE NULL END,
//     CASE WHEN month(fly_date)>=9 AND month(fly_date)<=11 THEN 'fall' ELSE NULL END
//   ) AS season
//   FROM Airplane_Route);
//   CREATE VIEW seaon_route_num AS(
//   SELECT season, a1.city AS src_city, a1.state AS src_state, 
//   a2.city AS dst_city, a2.state AS dst_state, SUM(passengers) AS sum_num
//   FROM airport_season r JOIN Airport a1 ON r.src_airport = a1.airport_code 
//   JOIN Airport a2 ON r.dst_airport = a2.airport_code
//   GROUP BY season, src_airport, dst_airport
//   ORDER BY SUM(passengers) DESC);
/* ---- home (3. popular airplane routes by season) ---- */
const getTop1Seasonroutes = (req, res) => {
  var query = `
  SELECT season, src_city, src_state, src_latitude, src_longitude,
  dst_city, dst_state, latitude AS dst_latitude, longitude AS dst_longitude, passenger_num
  FROM(
  SELECT season, src_city, src_state, latitude AS src_latitude, longitude AS src_longitude,
  dst_city, dst_state,passenger_num
  FROM(
  SELECT season, src_city, src_state, dst_city, dst_state, MAX(sum_num) AS passenger_num
  FROM seaon_route_num
  GROUP BY season) t1
  JOIN cityStateLatLon ON t1.src_city=cityStateLatLon.city AND t1.src_state=cityStateLatLon.state_id) t2
  JOIN cityStateLatLon ON t2.dst_city=cityStateLatLon.city AND t2.dst_state=cityStateLatLon.state_id;
  `;
connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});
};

/* ---- home (4. Monthly airplane route num) ---- */
const getMonthRouteNum = (req, res) => {
  var query = `
  SELECT month(fly_date) AS month, COUNT(*) AS route_num
  FROM Airplane_Route
  GROUP BY month(fly_date)
  ORDER BY COUNT(*) DESC;
  `;
connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});
};


/* ---- home (5. Top 10 states with highest temperature in a year) ---- */
// CREATE VIEW state_file (file_name, state_id) AS
// SELECT file_name, state_id
// FROM (SELECT file_name, state_id, ((cci.lat - cs.latitude)*(cci.lat - cs.latitude) +  (cci.lon - cs.longtitude) * (cci.lon - cs.longtitude)) AS dist
// FROM Climate_City_Info cci, City_State cs 
// ORDER BY dist LIMIT 1800) fs
// GROUP BY file_name;
// CREATE VIEW tmax_yearly (file_name, year_info, tmax) AS
// SELECT file_name, YEAR(date_record) AS year_info, MAX(tmax)
// FROM climate_tmax_not_null
// GROUP BY file_name, YEAR(date_record);
const getStateTmax = (req, res) => {
  var query = `
  SELECT state_name, cnt, latitude,longtitude AS longitude
  FROM(
  SELECT * FROM(
  SELECT state_name, COUNT(year_info) AS cnt
  FROM (SELECT state_id, year_info
  FROM state_file sf INNER JOIN tmax_yearly ty ON sf.file_name = ty.file_name
  WHERE (ty.year_info, tmax) IN (SELECT year_info, MAX(tmax) FROM tmax_yearly GROUP BY year_info)) yearly_maxT_state NATURAL JOIN State_Info
  GROUP BY state_name
  ORDER BY COUNT(year_info) DESC
  LIMIT 10) t1 NATURAL JOIN state_abbr) t2
  NATURAL JOIN (SELECT * FROM City_State
  GROUP BY state_id) t3;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- home (6. Top 10 (rank) museum with location ) ---- */
const getTop10Museum = (req, res) => {
  var query = `
  SELECT museum_name, t1.city, t1.state, latitude, longitude FROM(
  SELECT museum_name, city, state
  FROM Museum
  ORDER BY rating desc, rank asc, review_count desc
  LIMIT 10) t1
  JOIN cityStateLatLon ON t1.city=cityStateLatLon.city AND t1.state=cityStateLatLon.state_id;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// CREATE VIEW date_section AS (
//   SELECT min(date_record) AS min_date, max(date_record) as max_date
//   FROM climate_prcp_not_null 
//   GROUP BY file_name);
/* ---- climate basic info: year ---- */
const getyear = (req, res) => {
    var query = `
    SELECT distinct year(date_record) AS year
    FROM climate_prcp_not_null
    WHERE date_record >= ALL(SELECT max(min_date) FROM date_section)
    AND date_record <= ALL(SELECT min(max_date) FROM date_section)
    ORDER BY year;
    `;
    connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
    });
}
/* ---- climate basic info: month ---- */
const getmonth = (req, res) => {
  var query = `
  SELECT distinct month(date_record) AS month
  FROM climate_prcp_not_null
  WHERE date_record >= ALL(SELECT max(min_date) FROM date_section)
    AND date_record <= ALL(SELECT min(max_date) FROM date_section)
  ORDER BY month;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

//with view state_city_file
/* ---- climate basic info: plafe(state, city) ---- */
const getPlace = (req, res) => {
  var query = `
  SELECT state_name as state, city_name as city
  FROM state_city_file;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

const getState = (req, res) => {
  var query = `
  SELECT distinct state_name as state
  FROM state_city_file
  ORDER BY state_name;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/*
  === old query before optimization ===
  === time: 25.183 => 0.02 ===
  SELECT distinct city_name as city
  FROM state_city_file
  WHERE state_name = "${inputState}"
  ORDER BY city;
*/
const getCitybyState = (req, res) => {
  var inputState = req.params.state;
  var query = `
  SELECT city_name AS city
  FROM climate_state_city
  WHERE state_name = "${inputState}"
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/*
  ==== old query before optimization ===
  ==== time: - 21.189s => 0.061s ===
  var query = `
  SELECT state_name AS state, MIN(ave_daily_diff) AS temp
  FROM (state_file sf NATURAL JOIN State_Info) NATURAL JOIN 
    (SELECT file_name, AVG(ma.tmax - mi.tmin) AS ave_daily_diff
    FROM (SELECT * FROM climate_tmax_not_null 
          WHERE MONTH(date_record) = "${inputMonth}" AND YEAR(date_record) = "${inputYear}") ma
          NATURAL JOIN 
          (SELECT * FROM climate_tmin_not_null 
          WHERE MONTH(date_record) = "${inputMonth}" AND YEAR(date_record) = "${inputYear}") mi
    GROUP BY file_name) dtd
  GROUP BY state_name
  ORDER BY MIN(ave_daily_diff) ASC
  LIMIT 10;
  `;
*/

/* ---- cilmate-time  (1. Top 10 states with smallest average daily temperature difference) ---- */
const getTop10TempDiff = (req, res) => {
  var inputYear = req.params.year;
  var inputMonth = req.params.month;
  var query = `
  SELECT state_name AS state, MIN(ave_daily_diff) AS temp
  FROM
  (SELECT state_name, file_name, AVG(diff) AS ave_daily_diff
  FROM climate_tdiff_prcp
  WHERE month_record = "${inputMonth}" AND year_record = "${inputYear}"
  GROUP BY file_name
  ) a
  GROUP BY state_name
  ORDER BY temp ASC
  LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/*
  === old query before optimization ===
  === time: 30.471s => 0.05s ===
  SELECT state_name, AVG(rainy_day) as cnt
  FROM 
    (SELECT file_name, COUNT(*) AS rainy_day
     FROM climate_prcp_not_null
     WHERE YEAR(date_record) = "${inputYear}" AND MONTH(date_record) = "${inputMonth}" AND prcp > 0
     GROUP BY file_name) rainy_day_info
    NATURAL JOIN state_file 
    NATURAL JOIN State_Info
  GROUP BY state_name
  ORDER BY cnt
  LIMIT 10;

*/

/* ---- cilmate-time  (2. Top 10 states with least number of days of precipitation ) ---- */
const getTop10Prcp = (req, res) => {
  var inputYear = req.params.year; 
  var inputMonth = req.params.month;
  var query = `
  SELECT state_name, AVG(rainy_day) as cnt
  FROM 
    (SELECT state_name, file_name, COUNT(*) AS rainy_day
     FROM climate_tdiff_prcp
     WHERE month_record = "${inputMonth}" AND year_record = "${inputYear}" AND prcp > 0
     GROUP BY file_name) rainy_day_info
  GROUP BY state_name
  ORDER BY cnt
  LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- cilmate-city  (1. Monthly average  precipitation, tmax, tmin) ---- */
// CREATE VIEW state_city_file (file_name, state_name, city_name) AS
//     SELECT file_name, state_name, city_name
//     FROM (SELECT file_name, state_name, city AS city_name, ((cci.lat - cs.latitude)*(cci.lat - cs.latitude) +  (cci.lon - cs.longtitude) * (cci.lon - cs.longtitude)) AS dist
//     FROM Climate_City_Info cci, (SELECT * FROM City_State NATURAL JOIN City_Name NATURAL JOIN State_Info) cs 
//     ORDER BY dist LIMIT 1800) fs
//     GROUP BY file_name;

/*
  === old query before optimization ===
  === time: 45.887 => 8.512 ===
  === note: results differ because the new query omits null values ===
    SELECT month(date_record) AS month,  AVG(prcp) AS prcp, AVG(tmax) AS tmax, AVG(tmin) AS tmin
  FROM climate_data cd INNER JOIN state_city_file scf
  WHERE scf.state_name = "${inputState}" AND scf.city_name = "${inputCity}" AND cd.tmax IS NOT NULL AND cd.tmin IS NOT NULL AND cd.prcp IS NOT NULL
  GROUP BY month(date_record);

*/
const getCityMonthlyClimate = (req, res) => {
  var inputCity = req.params.city; 
  var inputState = req.params.state;
  var query = `
  SELECT month_record AS month,  AVG(prcp) AS prcp, AVG(tmax) AS tmax, AVG(tmin) AS tmin
  FROM climate_tdiff_prcp
  WHERE state_name = "${inputState}" AND city_name = "${inputCity}" AND tmax IS NOT NULL AND tmin IS NOT NULL AND prcp IS NOT NULL
  GROUP BY month_record;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- cilmate-city  (2. Historical yearly maximum and minimum temp) ---- */
const getCityYearlyClimate = (req, res) => {
  var inputCity = req.params.city; 
  var inputState = req.params.state;
  var query = `
  SELECT YEAR(date_record) AS year, AVG(tmax) AS tmax, AVG(tmin) AS tmin
  FROM climate_data cd INNER JOIN state_city_file scf
  WHERE scf.state_name = "${inputState}" AND scf.city_name = "${inputCity}" AND cd.tmax IS NOT NULL AND cd.tmin IS NOT NULL
  GROUP BY YEAR(date_record);
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- humanistic  (1.  Top 10 (rank) museum info) ---- */
const getTop10MuseumDetailed = (req, res) => {
  var query = `
  SELECT museum_name, city, state_name AS state, address, description, length_of_visit, fee, rank, phone
  FROM Museum m INNER JOIN State_Info s ON m.state=s.state_id
  WHERE length_of_visit IS NOT NULL AND fee IS NOT NULL
  ORDER BY rank asc, review_count desc
  LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- humanistic  (2.  10 County with lowest percentage of unemployment rate) ---- */
const getTop10Unemployment = (req, res) => {
  var query = `
  SELECT u.County AS county, s.state_name AS state, u.unemployed_rate AS unemploy_rate
  FROM Unemployment u INNER JOIN State_Info s ON u.State=s.state_id
  ORDER BY unemploy_rate
  LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- humanistic  (3.  10 County with highest median household income) ---- */
const getTop10Income = (req, res) => {
  var query = `
  SELECT u.County AS county, s.state_name AS state, median_hosehold_income
  FROM Unemployment u INNER JOIN State_Info s ON u.State=s.state_id
  ORDER BY median_hosehold_income desc
  LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- humanistic-state (1.  Museum info in the given state) ---- */
const getTopMuseumbyState = (req, res) => {
  var inputkw = req.params.state;
  var query = `
    SELECT museum_name, city, address, description, length_of_visit, fee, phone
    FROM Museum m INNER JOIN State_Info s ON m.state=s.state_id
    WHERE state_name = "${inputkw}"
    AND rating >=4.5
    ORDER BY review_count DESC
    LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- humanistic-state (2.  Top 5 counties of a given state which have the highest percentage of people who have at least a college degree) ---- */
const getTop5countyPercCollege = (req, res) => {
  var inputkw = req.params.state;
  var query = `
    SELECT county, 
    perc_college + perc_bachelor_higher AS percentage
    FROM Education e INNER JOIN State_Info s ON e.state=s.state_id
    WHERE state_name = "${inputkw}"
    ORDER BY perc_college + perc_bachelor_higher DESC
    LIMIT 5;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- humanistic-state (3.  Basic information -  pop, perc of college degree, poverty_all, unemployment rate of the state breaking down by counties in a table)---- */
const getBasicsEachCounty = (req, res) => {
  var inputkw = req.params.state;
  var query = `
    SELECT county, perc_college, poverty_all, population, unemployed_rate
    FROM Education NATURAL JOIN Poverty_estimate NATURAL JOIN Population_estimate NATURAL JOIN 
    (SELECT State, unemployed_rate, LEFT(County, LENGTH(County)-4) AS County FROM Unemployment) Unemployment_temp INNER JOIN State_Info s ON State=s.state_id
    WHERE state_name = "${inputkw}"  
    GROUP BY county;
`;
connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});
};


module.exports = {
	getTop10City: getTop10City,
  getTop10routes: getTop10routes,
  getTop1Seasonroutes: getTop1Seasonroutes,
  getMonthRouteNum: getMonthRouteNum,
  getyear: getyear,
  getmonth, getmonth,
  getPlace: getPlace,
  getState: getState,
  getCitybyState: getCitybyState,
  getStateTmax: getStateTmax,
  getTop10Museum: getTop10Museum,
  getTop10TempDiff: getTop10TempDiff,
  getTop10Prcp: getTop10Prcp,
  getCityMonthlyClimate: getCityMonthlyClimate,
  getCityYearlyClimate: getCityYearlyClimate,
  getTop10MuseumDetailed: getTop10MuseumDetailed,
  getTop10Unemployment: getTop10Unemployment,
  getTop10Income: getTop10Income,
  getTopMuseumbyState: getTopMuseumbyState,
  getTop5countyPercCollege: getTop5countyPercCollege,
  getBasicsEachCounty: getBasicsEachCounty

};
