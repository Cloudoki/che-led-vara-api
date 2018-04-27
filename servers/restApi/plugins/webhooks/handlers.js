const Joi = require('joi');
const db = require('data');

const handleEvent = {
	description: 'Event Hooks',
	handler: async (request, h) => {
		console.log(request.payload);

		return h.response().code(200);
	}
};

module.exports = {
	handleEvent
};