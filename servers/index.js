const restApi = require('servers/restApi');
const rtServer = require('servers/socketIo');
const db = require('data');

db.load()
	.then(() => console.log('Data loaded'))
	.then(() => Promise.all([restApi, rtServer]))
	.then(() => console.log('Servers are up'))
	.then(() => require('services/ping'))
	.catch((err) => {
		console.log('Failed to start the servers', err.stack);
		process.exit(1);
	});
