const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

router.post('/communities/:communityId/members', async (req, res) => {
  try {
    const { communityId } = req.params;
    const { name, email } = req.body;
    const member = new Member({ name, email, communityId, role: 'Community Member' });
    await member.save();
    return res.status(201).json({ message: 'Member added successfully', member });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.get('/communities/:communityId/members', async (req, res) => {
    try {
      const { communityId } = req.params;
      const members = await Member.find({ communityId });
      return res.status(200).json({ members });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  });


  router.delete('/communities/:communityId/members/:memberId', async (req, res) => {
    try {
      const { communityId, memberId } = req.params;
      const member = await Member.findOneAndRemove({ _id: memberId, communityId });
      if (!member) {
        return res.status(404).json({ message: 'Member not found in this community' });
      }
      return res.json({ message: 'Member removed successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  });