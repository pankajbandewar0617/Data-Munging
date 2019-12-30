const {Data} = require("./common")
const path = 'data/football.dat';
const teamColumn = 1;
const goalForTeamColumn = 6;
const goalAgainstTeamColumn = 8;

class Football extends Data {
    constructor(readfile,index,max,min){
        super(readfile,index,max,min);
    }
}

let football = new Football(path, teamColumn, goalForTeamColumn, goalAgainstTeamColumn); 
football.readValue().then(data => {
    const value = football.newData(data);
    const value1 = football.minimumDifference(value);
    const team = value[value1[0]]['index']
    const min = value1[1]

    console.log(`${team} team has smallest difference of for and against goal is ${min}`);
}).catch(error => {
    console.log(error);
}); 
