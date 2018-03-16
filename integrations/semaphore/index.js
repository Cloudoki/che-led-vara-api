const request = require('request-promise');
const config = require('config');

const listOrganizationProjects = () => {
	const options = {
    uri: config.sempahore.baseUrl + '/v2/orgs/' + config.sempahore.organization,
    qs: {
        access_token: config.semaphore.authToken
    },
    json: true
	};

	return request(options);
};



module.exports = {
	listOrganizationProjects
};