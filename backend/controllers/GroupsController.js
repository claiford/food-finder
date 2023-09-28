const Customer = require("../models/CustomerModel");
const Group = require("../models/GroupModel");
const Session = require("../models/SessionModel");
const mongoose = require("mongoose");

module.exports = {
	index,
	create,
	show,
	addMember,
	removeMember,
	delete: deleteGroup,
};

async function index(req, res) {
	try {
		const customer = await Customer
			.findById(req.params.customer_id)
			.populate("groups");

		// const inSession = customer.groups.filter(async (group) => {
		// const session = await Session.findOne({ group: group._id, status: "incomplete" });
		// console.log(!!session, group.name);
		// return !!session
		// })

		const inSession = [];
		for (const group of customer.groups) {
			const session = await Session.findOne({
				group: group._id,
				status: "incomplete",
			});
			if (session) inSession.push(group);
		}

		res.json({
			groups: customer.groups,
			inSession: inSession,
		});
	} catch (error) {
		console.error("Error fetching groups", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

// Create a new group
async function create(req, res) {
	try {
		const user = await Customer.findById(req.body.user_id);
		const newGroupData = req.body.new_group;
		newGroupData.members.push(user);

		const newGroup = await Group.create(newGroupData); //creates doc in mongodb

		newGroupData.members.forEach(async (m) => {
			const member = await Customer.findById(m._id);
			member.groups.push(newGroup._id);
			await member.save();
		});
		res.send("Group created successfully");
	} catch (error) {
		console.log(error + "An error occurred while creating the group");
	}
}

async function addMember(req, res) {
	try {
		const group = await Group.findById(req.params.group_id);
		const newMemberIds = req.body.members.map((member) => member._id);
		group.members = group.members.concat(newMemberIds);
		await group.save();

		newMemberIds.forEach(async (member_id) => {
			const member = await Customer.findById(member_id);
			member.groups.push(req.params.group_id)
			await member.save();

			const incompleteSession = await Session.findOne({ group: req.params.group_id, status: "incomplete" });
			incompleteSession.voters.push({
				voter: member._id,
				status: 0
			});
			await incompleteSession.save()
		})

		res.send("Members added.");
	} catch (error) {
		console.error("Error adding members to the group", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function removeMember(req, res) {
	try {
		// Find the group
		const group = await Group.findById(req.params.group_id);
		// Remove user from the group's members array
		group.members = group.members.filter((memberId) => memberId.toString() !== req.body.member._id);
		await group.save();

		// Find the user
		const user = await Customer.findById(req.body.member._id);
		// Remove the group from the user's groups array
		user.groups = user.groups.filter((group) => group.toString() !== req.params.group_id);
		await user.save();

		const incompleteSession = await Session.findOne({ group: req.params.group_id, status: "incomplete" });
		incompleteSession.voters = incompleteSession.voters.filter((voterStatus) => voterStatus.voter.toString() !== req.body.member._id);
		await incompleteSession.save()

		console.log(`Member ${user.name} removed from group ${group.name}.`)
		res.send("Member removed.");
	} catch (error) {
		console.error("Error removing member from the group", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function show(req, res) {
	try {
		const group = await Group.findById(req.params.group_id).populate("members");
		res.json(group);
	} catch (err) {
		console.log(err);
	}
}

async function deleteGroup(req, res) {
	try {
		console.log("deleting group");
		const group = await Group.findById(req.params.group_id).populate('members');
		group.members.forEach(async (member) => {
			member.groups = member.groups.filter((group) => 
				group.toString() !== req.params.group_id
			)
			await member.save();
		})

		await Group.findByIdAndDelete(req.params.group_id);

		res.send("Group deleted.")
	} catch (err) {
		console.log(err);
	}
}