const Customer = require("../models/CustomerModel");
const Group = require("../models/GroupModel");


module.exports = {
  create,
  show,
  new: newGroup,
  getAllGroups
};

// Create a new group

async function create(req , res) {
    try {
        console.log("creating backend group");
        const newGroup = await Group.create(req.body.data); //creates doc in mongodb
        const member = await Customer.findById(req.body.user); //gives specific customer 
        //put group id into member groupIds 
        const memberGroup = member.groups_id;
        memberGroup.push(newGroup._id);
        member.save(); //saves doc after changes
        res.json({message: 'Group created successfully', newGroup});
    } catch (error) {
        console.log(error + 'An error occurred while creating the group');
    }
};

async function getAllGroups(req, res) {
    try {
      const userId = req.params.customer_id;
      const member = await Customer.findById(userId).populate("groups_id");
    if (!member) {
      return res.status(404).json({ error: 'User not found' });
    }

      const memberGroup = member.groups_id;
      console.log(memberGroup, "member group")
        res.json(memberGroup);
    } catch (error) {
        console.error('Error fetching groups', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

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