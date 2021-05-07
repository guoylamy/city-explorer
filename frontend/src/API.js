import axios from 'axios';

const uri = 'http://localhost:8081'

export const getPopularCity = axios.get(uri + '/home/popular_city');
export const getPopularFlights = axios.get(uri + '/home/route_info');
export const getPopularMuseums = axios.get(uri + '/home/museum');