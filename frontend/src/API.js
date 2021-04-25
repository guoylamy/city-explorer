import axios from 'axios';

const uri = 'localhost:8081'

const getTop10City = axios.get(uri + '/home/popular_city')
    .then(res => {
        console.log(res);
    });

/*
[
    {
        "city": "Chicago",
        "state": "IL",
        "Total_passengers": 3235686300,
        "most_visted_airport": "ORD",
        "latitude": 41.8373,
        "longitude": -87.6862
    },
    {
        "city": "Atlanta",
        "state": "GA",
        "Total_passengers": 2889771310,
        "most_visted_airport": "ATL",
        "latitude": 33.7627,
        "longitude": -84.4224
    },
    {
        "city": "Dallas",
        "state": "TX",
        "Total_passengers": 2659645680,
        "most_visted_airport": "DFW",
        "latitude": 32.7936,
        "longitude": -96.7662
    },
    {
        "city": "Los Angeles",
        "state": "CA",
        "Total_passengers": 1947383010,
        "most_visted_airport": "LAX",
        "latitude": 34.1139,
        "longitude": -118.4068
    },
    {
        "city": "New York",
        "state": "NY",
        "Total_passengers": 1692524540,
        "most_visted_airport": "LGA",
        "latitude": 40.6943,
        "longitude": -73.9249
    },
    {
        "city": "Houston",
        "state": "TX",
        "Total_passengers": 1584849455,
        "most_visted_airport": "IAH",
        "latitude": 29.7863,
        "longitude": -95.3889
    },
    {
        "city": "Phoenix",
        "state": "AZ",
        "Total_passengers": 1480409335,
        "most_visted_airport": "PHX",
        "latitude": 33.5722,
        "longitude": -112.0891
    },
    {
        "city": "Las Vegas",
        "state": "NV",
        "Total_passengers": 1346428480,
        "most_visted_airport": "LAS",
        "latitude": 36.2333,
        "longitude": -115.2654
    },
    {
        "city": "Detroit",
        "state": "MI",
        "Total_passengers": 1266097250,
        "most_visted_airport": "DTW",
        "latitude": 42.3834,
        "longitude": -83.1024
    },
    {
        "city": "Washington",
        "state": "DC",
        "Total_passengers": 1265868245,
        "most_visted_airport": "DCA",
        "latitude": 38.9047,
        "longitude": -77.0163
    }
]
*/