import React from 'react';
import WeatherIcon from 'react-icons-weather';
import { Card } from "react-bootstrap";
var moment = require('moment');

const WeatherCard = ({data, index}) => {
  let newDate = new Date();
  const weekday = data.dt * 1000;
  newDate.setTime(weekday);
  return (
    <Card bg="grey" border="success" key={index}>
      <Card.Body>
        <h3 className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</h3>
        <p className="card-title">{moment(newDate).format('dddd')}</p>
        <h2>{Math.round(data.main.temp)} °F</h2>
        <WeatherIcon name="owm" iconId={data.weather[0].id} flip="horizontal" rotate="90" />
        <div className="card-body">
          <p className="card-text">{data.weather[0].description}</p>
        </div>
      </Card.Body>
    </Card>
  )
}

export default WeatherCard;