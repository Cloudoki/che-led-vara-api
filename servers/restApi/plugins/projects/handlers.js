const Joi = require('joi');
const semaphoreApi = require('integrations/semaphore');
const db = require('data');
const pingService = require('services/ping')

const setProjects = {
	description: 'Adds/replaces projects',
	validate: {
		payload: Joi.array().items(Joi.object().keys({
			id: Joi.string().required(),
			ledBuild: Joi.number().integer(),
			ledMonitor: Joi.number().integer(),
			ledDeploy: Joi.number().integer(),
			name: Joi.string().required(),
			monitorUrl: Joi.string(),
			environment: Joi.string().valid('development', 'staging', 'production')
		})).min(1).required()
	},
	handler: async (request, h) => {
		let newProjConfs = request.payload;

		// Delete webhooks for each removed project, if any
		for (let storedConf of db.get()) {
			let exists = false;
		
			for (let newConf of newProjConfs) {
				if (storedConf.id === newConf.id) {
					exists = true;
					break;
				}
			}
			if (!exists) await pingService.stop(storedConf.id)
		}

		// Add webhooks for each new project
		for (let i = 0; i !== newProjConfs.length; ++i) {
			let isNew = true;
	
			for (let storedConf of db.get()) {
				if (storedConf.id === newProjConfs[i].id) {
					isNew = false;
					break;
				}
			}
			if (isNew && newProjConfs.monitorUrl && newProjConfs.ledMonitor) pingService.ping(newProjConfs.id, newProjConfs.monitorUrl, led);
		}

		await db.set(newProjConfs)

		return h.response().code(200);
	}
};

module.exports = {
	setProjects
};