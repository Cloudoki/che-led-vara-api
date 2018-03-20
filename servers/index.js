const restApi = require('servers/restApi');
const rtServer = require('servers/socketIo');

Promise.all([restApi, rtServer])
	.then(() => console.log('Servers are up'))
	.catch((err) => {
		console.log('Failed to start the servers', err.stack);
		process.exit(1);
	});
