const Joi = require('joi');
const db = require('data');
const io = require('servers/socketIo/io')

const handleEvent = {
	description: 'Event Hooks',
	validate: {
		params: {
			id: Joi.string().required()
		}
	},
	handler: async (request, h) => {
		const proj = db.getProject(request.params.id);
		if (!proj) return h.response().code(400);
		console.log(request.payload)
		if (request.payload.event === 'build' && proj.ledBuild >= 0) {
			console.log('emitting', 'deploy')
			io.sockets.send('deploy');

		} else if (request.payload.event === 'deploy' && proj.ledDeploy >= 0) {
			console.log('emitting', 'HERE')			
			io.sockets.emit('build');
		}

		return h.response().code(200);
	}
};

module.exports = {
	handleEvent
};