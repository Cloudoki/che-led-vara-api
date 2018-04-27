const handlers = require('./handlers');

module.exports = {

	register: async (server) => {

		server.route([
			{
				method: 'POST',
				path: '/hooks/{id}',
				options: handlers.handleEvent
			}
		]);
	},

    name: 'HookEventsHandler',
    version: '1.0.0',
    once: true
};
