const Group = require('../models/GroupModel');

module.exports = {
    create,
    show,
    new: newGroup,
}

// Create a new group

async function create(req, res) {
    try {
        await Group.create(req.body);
        const group = await Group.find({}); //gets every group from the group database
        res.json({ message: 'Group created successfully', group });
    } catch (error) {
        console.log(error + 'An error occurred while creating the group');
    }
};

function newGroup(req, res) {

    res.render("group/new", { title: "New Group", errorMsg: "" });
}

async function show(req, res) {
    try {
        const group = await Group.findById(req.params.group_id).populate("memberIds");
        res.json(group);
    } catch (err) {
        console.log(err)
    }
}