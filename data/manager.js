const bbPromise = require('bluebird');
const fs = bbPromise.promisifyAll(require('fs'));

const dbPath = __dirname + "/db.json";

let db = [];

const load = () => {
	return fs.readFile(dbPath)
		.then((data) => {
			db = data;
			return db;
		})
};

const save = (data) => {
	return fs.writeFile(dbPath, data)
		.then((data) => {
			db = data;
			return db;
		})
};

const get = () => {
	return db;
};

const set = (data) => {
	db = data;
	return save(data);
};

module.exports = {
	get,
	add
};
