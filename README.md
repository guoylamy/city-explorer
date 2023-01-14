# City Explorer
##### Find out climate, demographics and travel info about a city you are interested in!

## Run Scripts
Run frontend:
at `./frontend:`
```
npm install
npm start
```

Run backend:
at `./server:`
```
npm install
npm start
```

## Screenshots
![screenshot1](https://github.com/tkong233/city-explorer/blob/main/screenshots/screenshot1.png?raw=true)
![screenshot2](https://github.com/tkong233/city-explorer/blob/main/screenshots/screenshot2.png?raw=true)
![screenshot3](https://github.com/tkong233/city-explorer/blob/main/screenshots/screenshot3.png?raw=true)
![screenshot4](https://github.com/tkong233/city-explorer/blob/main/screenshots/screenshot4.png?raw=true)
![screenshot5](https://github.com/tkong233/city-explorer/blob/main/screenshots/screenshot5.png?raw=true)
![screenshot6](https://github.com/tkong233/city-explorer/blob/main/screenshots/screenshot6.png?raw=true)
![screenshot7](https://github.com/tkong233/city-explorer/blob/main/screenshots/screenshot7.png?raw=true)
![screenshot8](https://github.com/tkong233/city-explorer/blob/main/screenshots/screenshot8.png?raw=true)
![screenshot9](https://github.com/tkong233/city-explorer/blob/main/screenshots/screenshot9.png?raw=true)
![screenshot10](https://github.com/tkong233/city-explorer/blob/main/screenshots/screenshot10.png?raw=true)

## Data Sources and Usage
### US Airport
[US Airport Data](https://www.kaggle.com/flashgordon/usa-airport-dataset)  
This dataset records more than 3.5 Million US Domestic Flights from 1990 to 2009. The data has 15 attributes describing the point of departure and destination of each flight, together with some basic statistics info such as date and passenger number of the flight.
We pre-processed the data by removing excessive attributes and only retaining the ones we need (fly date, passengers number and flights, airport code, city, state). We also isolated the state and the city from the full addresses in the original dataset in order to prepare for joins. We constructed 2 tables based on this data: Airport and Airplane_Route. This dataset was huge, so
we had to populate it using batch processing. We used this dataset to provide air flights related information on the home page.
### US Climate
[US Climate Data](https://kilthub.cmu.edu/articles/dataset/Compiled_daily_temperature_and_precipitation_data_for_the_U_S_cities/7890488)  
This dataset records more than 10 Million historical daily temperature and precipitation data for 210 U.S. meteorological stations from 1900 to 2019. Data of each city is stored in one file with a unique file name and 4 attributes: date, max temperature, min temperature and precipitation. There is a file (city_info) records congruent relationship between file name and the coordinates of the meteorological station.
We merged all 210 files with climate data into one file and appended an attribute file_name to identify the data source. We reserved 3 attributes that we need in the city_info file: latitude, longitude and the corresponding file name. Since substantial amounts of data were missed, we removed null values and construct 4 tables: climate_tmax_not_null, climate_tmin_not_null, climate_prcp_not_null and Climate_city_info. We used this dataset to find the statistical information shown on our climate page.
### US Population
[US Population Data](https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx)  
This dataset records county-level educational attainment from 1970 to 2019, poverty estimates in 2019, unemployment and median household income from 2000 to 2019 and population estimates from 2010 to 2019 in the United States. The educational attainment file has 3K rows and 47 attributes. The poverty estimate file contains 3K rows and 28 attributes. The unemployment and median household income file has 3K rows and 87 attributes. The population estimates file contains 3K rows and 165 attributes.
We reserved part of the attributes and constructed 4 entities: unemployment, poverty_estimate, population_estimate and education. We used this dataset to find the statistical information shown on our demographic page.
### Museums
[Museums Data](https://www.kaggle.com/annecool37/museum-data)  
We used the tripadvisor_museum_USonly.csv, which records 1K general museum data scraped from TripAdvisor with 14 attributes. We reserved almost all attributes except latitude and longitude in the entity ‘Museum’ to avoid data redundancy. The analysis of museum data was displayed on both the home page and the demographics page to help users find high-quality museums.
### US Cities
[US Cities Data](https://simplemaps.com/data/us-cities)  
This dataset gives 30K geographic coordinates and the corresponding city name, county name, state name, state name abbreviation. We constructed 4 tables based on this dataset: city_name, city_county, city_state and state_info based on this dataset.
This dataset is used to join all location related information together. Since the coordinates in this dataset may not exactly match those in other dataset, we approximated the coordinates by finding the nearest coordinates during joins.

## Database Schema
![schema](https://github.com/tkong233/city-explorer/blob/main/screenshots/schema.png?raw=true)
```
Airplane_Route(id, fly_date, passengers, flights, src_airport, dst_airport) 18,032,495 instances
src_airport FOREIGN KEY REFERENCES Airport(code) dst_airport FOREIGN KEY REFERENCES Airport(code)
F = {id-->date; id-->passengers; id-->flights; id-->origin_airport; id-->destination_airport}

Airport(code, city, state) 726 instances
location FOREIGN KEY REFERENCES State(name)
F = {code-->city, code-->state}

climate_city_info(lat, lon, file_name) 210 instances
F = {lat,long-->file_name}

Historical_Climate_Prcp(file_name, date_record, precipitation) file_name FOREIGH KEY REFERENCES climate_city_info(file_name)
9,874,041 instances
F = {file_name, date_record -->precipitation}

Historical_Climate_Tmax(file_name, date_record, max_temperature)
file_name FOREIGH KEY REFERENCES climate_city_info(file_name)
F = {file_name, date_record -->max_temperature}

Historical_Climate_Tmin(file_name, date_record, min_temperature)
file_name FOREIGH KEY REFERENCES climate_city_info(file_name)
F = {file_name, date_record -->min_temperature}

Unemployment(State, County, labor_force, unemployed_rate, median_hosehold_income) 3,273 instances
State FOREIGN KEY REFERENCES state_info(state_id)
F = {State, County-->labor_force; State, County-->unemployed_rate; State, County-->median_hosehold_income}

Poverty_estimate(State, County, poverty_all, poverty_017) 3,191 instances
State FOREIGN KEY REFERENCES state_info(state_id)
F = {State, County-->poverty_all; State, County-->poverty_017}

Population_estimate(State, County, population, births, death) 3,192 instances
State FOREIGN KEY REFERENCES state_info(state_id)
F = {State, County-->population; State, County-->births; State, County-->death}

Education(State, County, perc_high_school, perc_college, perc_bachelor_higher) 3,281 instances
State FOREIGN KEY REFERENCES state_info(state_id)
F = {State, County-->perc_high_school; State, County-->perc_college; State, County--> perc_bachelor_higher }

Museum(museum_name, city, state, address, description, length_of_visit, fee, rank, phone, review_count, feature_count, things_to_do_count) 992 instances
state FOREIGN KEY REFERENCES state_info(state_id)
F = {museum_id -->museum_name; museum_id --> address; museum_id --> description; museum_id -->length_of_visit; museum_id -->fee; museum_id -->rank; museum_id -->location}

city_name(latitude, longitude, city) 28,338 instances
F = {latitude, longitude --> city}

city_county(latitude, longitude, county) 28,338 instances
F = {latitude, longitude --> county}

city_state(latitude, longitude, state_id) 28,338 instances
State_id FOREIGN KEY REFERENCES state_info(state_id)
F = {latitude, longitude --> state_id}

state_info(state_id, state_name) 52 instances
F = {state_id -->state_name}
```
