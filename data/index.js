const bbPromise = require('bluebird');
const fs = bbPromise.promisifyAll(require('fs'));

const dbPath = __dirname + "/db.json";

let db = [];

/** 
 * Db structure
 * 
 * {	
 * 		semaphoreId: {
 * 				leds: {
 * 						build: 1
 * 						status: 2
 * 				},
 * 				monitoringUrl: "blabla.com",
 * 				hookId: 345
 * 		}
 * }
 */

const load = () => {
	return fs.readFileAsync(dbPath)
		.then((data) => {
			db = data;
			return db;
		})
};

const save = (data) => {
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
	db = data;
	return save(data);
};

module.exports = {
	get,
	set
};
