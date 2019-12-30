const fs = require('fs');
const csv = require('fast-csv');

class Data {
    constructor(readfile, index, max, min) {
        this.file = readfile;
        this.index = index;
        this.max = max;
        this.min = min;
    }
    readValue() {
        let value = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(this.file)
                .pipe(csv.parse({ headers: false }))
                .on('data', (data) => {
                    value.push(data);
                }).on('end', () => {
                    resolve(value);
                });
        });
    }
    newData(data) {
        const newFilterData = {};
        for (let rawData of data) {
            if (rawData[0] !== undefined) {
                const splitData = rawData[0].replace('*', ' ').split(' ');
                const newValue = [];
                for (const value of splitData) {
                    if (value) {
                        newValue.push(value);
                    }
                    if (newFilterData[newValue[0]] === undefined) {
                        newFilterData[newValue[0]] = {};
                    } else {
                        newFilterData[newValue[0]]['index'] = newValue[this.index];
                        newFilterData[newValue[0]]['attr1'] = newValue[this.max];
                        newFilterData[newValue[0]]['attr2'] = newValue[this.min];
                    }
                }
            }
        }
        return newFilterData;
    };


    minimumDifference(newFilterData) {
        let min = 99999;
        let index = 0;
        for (const i in newFilterData) {
            const difference = Math.abs(newFilterData[i]['attr1'] - newFilterData[i]['attr2']);
            if (min > difference) {
                min = difference;
                index = i;
            }
        }
        return [index,min];
    };
}

module.exports = { Data }
