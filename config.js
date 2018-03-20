module.exports = {
	env: 'development',
	publicHost: 'http://localhost',
	webhooksPath: '/webhooks/',
	servers: {
		restApi: {
			config: {
				host: '0.0.0.0',
				port: 3000
			}
		},
		socketio: {
			config: {
				host: '0.0.0.0',
				port: 3001
			},
			token: process.env['SOCKET_AUTH_TOKEN']
		}
	},
	semaphore: {
		v2BaseUrl: 'https://api.semaphoreci.com/v2',
		v1BaseUrl: 'https://semaphoreci.com/api/v1',
		authToken: process.env['SEMAPHORE_AUTH_TOKEN'],
		organization: process.env['SEMAPHORE_ORGANIZATION']
	}
};