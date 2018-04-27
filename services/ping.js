const db = require('data');
const request = require('request-promise');
const io = require('servers/socketIo/io')
const config = require('config');

let pingTimers = {};

const stop = (projId) => {
	if (pingTimers[projId] && pingTimers[projId].timer) clearTimeout(pingTimers[projId].timer);
	delete pingTimers[projId];
}

const ping = async(projId, url) => {
	if (pingTimers[projId] && pingTimers[projId].timer) clearTimeout(pingTimers[projId].timer);

	const options = {
		uri: config.semaphore.v2BaseUrl + '/orgs/' + config.semaphore.organization + '/projects',
		simple: true // If status code is not in 200s throw error
	};

	try {
		let res = await request(db[projId].monitoringUrl)
		// Send notification to arduino
		io.sockets.emit('status', 'OK');
	} catch (err) {
		// Send notification to arduino
		io.sockets.emit('status', 'FAILED');
	}

	pingTimers[projId] = {
		timer: setTimeout(ping, 300000)
	}
};

for (let proj of db.get()) {
	if(!proj.monitoringUrl) continue;
	ping(proj.Id, proj.monitoringUrl)
}

module.exports = {
	ping,
	stop
}