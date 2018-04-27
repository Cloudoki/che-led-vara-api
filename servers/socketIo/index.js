const Hapi = require('hapi');
const config = require('config');
const plugins = require('servers/socketIo/plugins');

const server = Hapi.server(config.servers.socketio.config);

module.exports = server.register(plugins).then(() => server.start());
