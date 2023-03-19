const Member = require('../Model/memberModel');
const User = require('../Model/userModel');
const Role = require('../Model/roleModel');
const Community = require('../Model/communityModel')


const addMember = async (req, res) => {
  try {

    const token = req.token
    const id = token.id

    const memberCheck = await Member.findOne({ user: id })
    const roles = await Role.find()
    const adminId = roles.filter(item => item.name === 'Community Admin').map(item => item.id);

    if (memberCheck.role != adminId[0]) {
      return res.status(403).send({ status: false, message: "Access denied.." })
    }

    const { community, user, role } = req.body;
    const communitydata = await Community.findOne({ id: community })
    const userdata = await User.findOne({ id: user });
    const roleData = await Role.findOne({ id: role });

    if (!community) {
      return res.status(400).send({ message: 'Please provide name, slug, owner details' });
    }
    if (!user) {
      return res.status(400).send({ message: 'Please provide name, slug, owner details' });
    }
    if (!role) {
      return res.status(400).send({ message: 'Please provide name, slug, owner details' });
    }
    if (!communitydata) {
      return res.status(400).send({ message: 'Please provide name, slug, owner details' });
    }
    if (!userdata) {
      return res.status(400).send({ message: 'Please provide name, slug, owner details' });
    }
    if (!roleData) {
      return res.status(400).send({ message: 'Please provide name, slug, owner details' });
    }
    const member = await Member.create(req.body);

    let data = {
      id: member.id,
      community: member.community,
      user: member.user,
      role: member.role
    }

    return res.status(201).send({ status: true, content: { data: data } });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
};



const deleteMember = async (req, res) => {
  try {

    const token = req.token
    const Userid = token.id

    const memberCheck = await Member.findOne({ user: Userid })
    const roles = await Role.find()
    const adminId = roles.filter(item => item.name === 'Community Member').map(item => item.id);

    console.log(adminId)

    if (memberCheck.role == adminId[0]) {
      return res.status(403).send({ status: false, message: "Access denied.." })
    }

    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'Please provide id' });
    }

    const data = await Member.findOneAndDelete({ id: id });
    if (!data) {
      return res.status(404).send({ message: 'Member not found in this community' });
    }
    return res.status(200).send({ status: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
};


module.exports = { addMember, deleteMember }


// router.get('/communities/:communityId/members', async (req, res) => {
//   try {
//     const { communityId } = req.params;
//     const members = await Member.find({ communityId });
//     return res.status(200).json({ members });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });


