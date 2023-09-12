const Session = require('../models/Session');

module.exports = {
    index,
    create,
}

async function index(req, res) {
    try {
        // pending: "find" to be updated to query using group ID
        const sessions = await Session.find({});
        res.json(sessions);
    } catch (err) {
        console.log(err);
    }
}

async function create(req, res) {
    try {
        // pending: "create" to be updated to store group ID
        // pending:  update Session schema group type -> ObjectID
        const newSession = await Session.create({ group: "Test Group " + new Date(Date.now()).toLocaleTimeString() })
        res.json(newSession);
    } catch (err) {
        console.log(err);
    }
}