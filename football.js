/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const csv = require('fast-csv');
const _ = require('underscore');

fs.createReadStream('data/football.dat')
  .pipe(csv.parse({ headers: true }))
  .on('data', (footballData) => {
    newData(_.values(footballData));
  }).on('end', () => {
    minimumDifference();
  });

const newFootballData = {};

const newData = (footballData) => {
  const data = footballData[0].split(' ');
  const newValue = [];
  for (const value of data) {
    if (value) {
      newValue.push(value);
    }
    if (newFootballData[newValue[0]] === undefined) {
      newFootballData[newValue[0]] = {};
    } else {
      newFootballData[newValue[0]].team = newValue[1];
      newFootballData[newValue[0]].played = newValue[2];
      newFootballData[newValue[0]].wins = newValue[3];
      newFootballData[newValue[0]].lose = newValue[4];
      newFootballData[newValue[0]].draw = newValue[5];
      newFootballData[newValue[0]].for = newValue[6];
      newFootballData[newValue[0]].against = newValue[8];
      newFootballData[newValue[0]].points = newValue[9];
    }
  }
  return newFootballData;
};

minimumDifference = () => {
  let min = 99999; 
  let index = 0;
  for (const i in newFootballData) {
    const difference = Math.abs(newFootballData[i].for - newFootballData[i].against);
    if (min > difference) {
      min = difference;
      index = i;
    }
  }
  console.log(`${newFootballData[index].team} team has smallest difference of for and against goal is ${min}`);
};
