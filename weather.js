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
    const dataset = weather.newData(data);
    const differenceEachDay = weather.minimumDifference(dataset);
    const day = dataset[differenceEachDay[0]]['index']
    const min = differenceEachDay[1]

    console.log(`On ${day}th day has the smallest difference of ${min} degree celsius of maximum and minimum temperature.`);
}).catch(error => {
    console.log(error)
}); 
