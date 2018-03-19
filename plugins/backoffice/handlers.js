const sempahoreApiClient = require('integrations/semaphore');
const db = require('data');

module.exports = {};

module.exports.dashboardView = {
	description: 'Serves dashboard',
	handler: async (request, h) => {
		const projectsWithoutLed = await sempahoreApiClient.listOrganizationProjects();
		const projectsWithLed = await db.get();
		const data = {
			projects: projectsWithLed,
			freeProjects: projectsWithoutLed,
		};

    return h.view('dashboard', data);
	}
};