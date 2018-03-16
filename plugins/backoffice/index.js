const ejs = require('ejs');
const handlers = require('./handlers');

module.exports = {

    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/admin',
                options: handlers.dashboardView
            }
				]);
				
				server.views({
					engines: { ejs },
					path: __dirname + '/views'
			});
    },

    name: 'backoffice',
    version: '1.0.0',
    once: true
};
