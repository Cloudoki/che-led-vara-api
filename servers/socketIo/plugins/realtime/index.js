const io = require('servers/socketIo/io');

module.exports = {

	register: async (server) => {
		io.listen(server.listener);

		io.on('connection', function(socket) {
			console.log(socket.id, 'New connection');

			const timer = setTimeout(function () {
				socket.disconnect();
			}, 2000);
 
			socket.on('auth', function (token) {
				cleartimeout(timer);
				if (!socket.authenticated && token === config.serverToken)
					socket.authenticated = true;
			});

			// User quit chat events, release socket
			socket.on('disconnect', function () {
				console.log(socket.id, 'disconnected');
			});
		});
	},

    name: 'realtime',
    version: '1.0.0',
    once: true
};
