const bbPromise = require('bluebird');
const fs = bbPromise.promisifyAll(require('fs'));

const dbPath = __dirname + "/db.json";

let db = require('./db.json');


const save = async (data) => {
	return fs.writeFileAsync(dbPath, JSON.stringify(data))
		.then((data) => {
			db = data;
			return db;
		})
};

const get = () => {
	return db;
};

const set = async (data) => {
	return await save(data);
};

module.exports = {
	get,
	set,
	save
};
