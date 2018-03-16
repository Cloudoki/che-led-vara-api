
module.exports = {};

module.exports.dashboardView = {
	description: 'Serves dashboard',
	handler: async (request, h) => {
		
		const data = {
			title: 'Yeyy',
			message: 'Test me'
		};

    return h.view('dashboard', data);
	}
};