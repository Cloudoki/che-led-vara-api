const Hapi = require('hapi');
const config = require('config');
const plugins = require('plugins');

const server = Hapi.server(config.server);

server.register(plugins)
	.then(() => {
		return server.start()
	})
	.then(() => console.log('Server is up'))
	.catch((err) => {
		console.log('Failed to start API', err.stack);
		process.exit(1);
	});

// Print incoming requests
server.events.on('response', (request) => {
  console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});
