const bbPromise = require('bluebird');
const fs = bbPromise.promisifyAll(require('fs'));

const dbPath = __dirname + "/db.json";

let db = require('./db.json');

const save = (data) => fs.writeFileAsync(dbPath, JSON.stringify(data));

const get = () => db;

const getProject = (id) => {
	for (let proj of db) {
		if (proj.id === id) return proj;
	}
	return null;
}

const set = async (data) => {
	db = data;
	await save(data);
};

module.exports = {
	get,
	set,
	save,
	getProject
};
