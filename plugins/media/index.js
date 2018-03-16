module.exports = {

	register: async (server) => {

		server.route([
			{
				method: 'GET',
				path: '/media/{params*}',
				handler: {
					directory: {
						path: './public/',
						listing: false
					}
				}
			}
		]);
	},

    name: 'media',
    version: '1.0.0',
    once: true
};
