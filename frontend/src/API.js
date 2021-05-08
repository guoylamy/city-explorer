import axios from 'axios';

// export const uri = 'http://ec2-18-207-141-170.compute-1.amazonaws.com:8081/api';
export const uri = 'http://localhost:8081/api';

export const getPopularCity = axios.get(uri + '/home/popular_city');
export const getPopularFlights = axios.get(uri + '/home/route_info');
export const getPopularMuseums = axios.get(uri + '/home/museum');
export const getSeasonalRoutes = axios.get(uri + '/home/seasonal_route');
export const getMonthlyRoutesNum = axios.get(uri + '/home/monthly_route_num');
export const getStateTmax = axios.get(uri + '/home/state_tmax');