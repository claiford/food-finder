const Customer = require("../models/CustomerModel");
const Group = require("../models/GroupModel");
const mongoose = require('mongoose'); 


module.exports = {
  create,
  show,
  new: newGroup,
  getAllGroups,
  addMember,
  removeMember
};

// Create a new group
async function create(req , res) {
    try {
        const user = await Customer.findById(req.body.user);
        const newGroupData = req.body.data;
        newGroupData.members.push(user);

        const newGroup = await Group.create(newGroupData); //creates doc in mongodb

        newGroupData.members.forEach(async (m) => {
          const member = await Customer.findById(m._id);
          member.groups.push(newGroup._id);
          member.save();
        })
        // const member = await Customer.findById(req.body.user); //gives specific customer 
        // //put group id into member groupIds 
        // const memberGroup = member.groups;
        // memberGroup.push(newGroup._id);
        // member.save(); //saves doc after changes
        res.json({message: 'Group created successfully', newGroup});
    } catch (error) {
        console.log(error + 'An error occurred while creating the group');
    }
};

async function getAllGroups(req, res) {
    try {
      const userId = req.params.customer_id;
      const member = await Customer.findById(userId).populate("groups");
    if (!member) {
      return res.status(404).json({ error: 'User not found' });
    }

      const memberGroup = member.groups;
        res.json(memberGroup);
    } catch (error) {
        console.error('Error fetching groups', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function addMember(req, res) {
  try {
    const groupId = req.params.group_id;
    const group = await Group.findById(groupId);
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const newMembers = req.body.data.memberIds; // Array of customer IDs

    // Validate the member IDs before processing
    const validMembers = newMembers.filter(id => mongoose.Types.ObjectId.isValid(id));

    if (validMembers.length !== newMembers.length) {
      return res.status(400).json({ error: 'Invalid member ID(s) provided' });
    }

    // Update group's memberIds array
    group.memberIds = group.memberIds.concat(validMembers);
    await group.save();

    // Update members' groups array
    for (const newMemberId of validMembers) {
      const member = await Customer.findById(newMemberId);
      
      if (!member) {
        return res.status(404).json({ error: `User with ID ${newMemberId} not found` });
      }

      if (!member.groups.includes(groupId)) {  // ensure groupId isn't added more than once
        member.groups.push(groupId);
        await member.save();
      }
    }

    res.json({ message: 'Members added to the group successfully' });
  } catch (error) {
    console.error('Error adding members to the group', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function removeMember(req, res) {
  try {
      const groupId = req.params.group_id;
      const userId = req.params.user_id;

      // Check if group_id and user_id are valid ObjectId formats
      if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid group_id or user_id provided' });
      }

      // Find the group
      const group = await Group.findById(groupId);
      if (!group) {
          return res.status(404).json({ error: 'Group not found' });
      }

      // Remove user from the group's memberIds array
      group.memberIds = group.memberIds.filter((memberId) => memberId.toString() !== userId);
      await group.save();

      // Find the user
      const user = await Customer.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Remove the group ID from the user's groups array
      user.groups = user.groups.filter((currentGroupId) => currentGroupId.toString() !== groupId);
      await user.save();

      res.json({ message: 'Member removed from the group successfully' });
  } catch (error) {
      console.error('Error removing member from the group', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

function newGroup(req, res) {
  res.render("group/new", { title: "New Group", errorMsg: "" });
}

async function show(req, res) {
    try {
        const group = await Group.findById(req.params.group_id).populate("members");
        res.json(group);
    } catch (err) {
        console.log(err)
    }
}
