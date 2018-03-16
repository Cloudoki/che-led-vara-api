const request = require('request-promise');
const config = require('config');

const listOrganizationProjects = async () => {
	const options = {
    uri: config.semaphore.v2BaseUrl + '/orgs/' + config.semaphore.organization + '/projects',
    headers: {
			authorization: 'Token ' + config.semaphore.authToken
    },
    json: true
	};

	return request(options);
};

const createWebHook = async (projectId) => {
	const options = {
		method: 'POST',
    uri: config.semaphore.v1BaseUrl + '/projects/' + projectId,
    headers: {
			authorization: 'Token ' + config.semaphore.authToken
    },
		body: {
			url: config.publicHost + config.webhooksPath + projectId,
			hook_type: "all"
		},
    json: true
	};

	return request(options);
};

const deleteWebHook = async (projectId, hookId) => {
	const options = {
		method: 'DELETE',
    uri: config.semaphore.baseUrl + '/projects/' + projectId + '/hooks/' + hookId,
    headers: {
			authorization: 'Token ' + config.semaphore.authToken
    },
    json: true
	};

	return request(options);
};


module.exports = {
	listOrganizationProjects,
	createWebHook,
	deleteWebHook
};