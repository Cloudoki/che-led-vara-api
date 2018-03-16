module.exports = {
	env: 'development',
	publicHost: 'http://localhost',
	webhooksPath: '/webhooks/',
	server: {
  	host: '0.0.0.0',
    port: 3000
	},
	semaphore: {
		v2BaseUrl: 'https://api.semaphoreci.com/v2',
		v1BaseUrl: 'https://semaphoreci.com/api/v1',
		authToken: process.env['SEMAPHORE_AUTH_TOKEN'],
		organization: process.env['SEMAPHORE_ORGANIZATION']
	}
};