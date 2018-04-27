module.exports = [
	require('inert'),
	require('vision'),
	require('servers/restApi/plugins/media'),
	require('servers/restApi/plugins/projects'),
	require('servers/restApi/plugins/backoffice'),
	require('servers/restApi/plugins/webhooks')
];