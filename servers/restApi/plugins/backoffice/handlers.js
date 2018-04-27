const sempahoreApiClient = require('integrations/semaphore');
const db = require('data');
const config = require('config');

module.exports = {};

module.exports.dashboardView = {
	description: 'Serves dashboard',
	handler: async (request, h) => {
		const projectsWithoutLed = await sempahoreApiClient.listOrganizationProjects();
		const projectsWithLed = db.get();
		const data = {
			projectsWithLed: projectsWithLed,
			projectsWithoutLed: projectsWithoutLed,
			baseUrl: config.publicHost + ':3000/',
			hooksUrl: config.publicHost + '/hooks/'
		};

    return h.view('dashboard', data);
	}
};