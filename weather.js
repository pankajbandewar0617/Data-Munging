const { Data } = require("./common")
const path = 'data/weather.dat';
const dayColumn = 0;
const maximumTemperatureColumn = 1;
const minimumTemperatureColumn = 2;

class Weather extends Data {
    constructor(readfile, index, max, min) {
        super(readfile, index, max, min);
    }
}

let weather = new Weather(path, dayColumn, maximumTemperatureColumn, minimumTemperatureColumn);
weather.readValue().then(data => {
    const value = weather.newData(data);
    const value1 = weather.minimumDifference(value);
    const day = value[value1[0]]['index']
    const min = value1[1]

    console.log(`On ${day}th day has the smallest difference of ${min} degree celsius of maximum and minimum temperature.`);
}).catch(error => {
    console.log(error)
}); 
