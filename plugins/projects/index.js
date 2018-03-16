const handlers = require('./handlers');

module.exports = {

    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/projects',
                options: handlers.getProjects
						},
						{
							method: 'POST',
							path: '/projects',
							options: handlers.setProjects
					}
				]);
    },

    name: 'projects',
    version: '1.0.0',
    once: true
};
