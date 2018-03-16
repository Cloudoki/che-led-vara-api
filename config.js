module.exports = {
	env: 'development',
  publicHost: 'http://localhost/',
	server: {
  	host: '0.0.0.0',
    port: 3000
	},
	semaphore: {
		baseUrl: 'https://api.semaphoreci.com',
		authToken: process.env['SEMAPHORE_AUTH_TOKEN'],
		organization: process.env['SEMAPHORE_ORGANIZATION']
	}
};