/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */

const fs = require('fs');
const csv = require('fast-csv');
const _ = require('underscore');

fs.createReadStream('data/weather.dat')
  .pipe(csv.parse({ headers: true }))
  .on('data', (weatherData) => {
    newData(_.values(weatherData));
  }).on('end', () => {
    minimumDifference();
  });


const newWeatherData = {};

const newData = (weatherData) => {
  // console.log(weatherData[0].length);
  // for (let i = 0; i < weatherData.length; i++){
  //   console.log()
  // }
  const data = weatherData[0].split(' ');
  const newValue = [];
  for (const value of data) {
    if (value) {
      newValue.push(value);
    }
    if (newWeatherData[newValue[0]] === undefined) {
      newWeatherData[newValue[0]] = {};
    } else {
      newWeatherData[newValue[0]]['MxT'] = newValue[1];
      newWeatherData[newValue[0]]['MnT'] = newValue[2];
      newWeatherData[newValue[0]]['AvT'] = newValue[3];
    }
  }return newWeatherData
}

minimumDifference = () => {
  let min = 99999; 
  let index = 0;
  for (const i in newWeatherData) {
    const difference = Math.abs(newWeatherData[i]['MxT'] - newWeatherData[i]['MnT']);
    if (min > difference) {
      min = difference;
      index = i;
    }
  }
  console.log(`On ${index}th day has the minimum difference in temperature is ${min} degree celsius.`);
};

