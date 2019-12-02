const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

//subtract from current date.
//moment() will hold current date
//const DATE = moment().subtract(1, 'd').format();
const DATE = moment().subtract(177, 'd').format();

const data = {
    date: DATE
}

jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit().add([FILE_PATH]).commit(DATE, {
        '--date': DATE
    }).push();
});