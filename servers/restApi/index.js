const Hapi = require('hapi');
const plugins = require('servers/restApi/plugins');
const config = require('config');

const server = Hapi.server(config.servers.restApi);

// Print incoming requests
server.events.on('response', (request) => {
  console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});

module.exports = server.register(plugins).then(() => server.start());
