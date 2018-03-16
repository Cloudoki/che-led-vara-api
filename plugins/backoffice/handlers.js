const sempahoreApiClient = require('integrations/semaphore');
const db = require('data');

module.exports = {};

module.exports.dashboardView = {
	description: 'Serves dashboard',
	handler: async (request, h) => {
		const existingProjects = await sempahoreApiClient.listOrganizationProjects();
		const possibleProjects = await db.get();
		console.log(existingProjects);
		console.log(possibleProjects);
		const data = {
			projects: existingProjects,
			freeProjects: possibleProjects,
		};

    return h.view('dashboard', data);
	}
};