const User = require('../Model/userModel');
const communityModel = require('../Model/communityModel');
const memberModel = require('../Model/memberModel')
const roleModel = require('../Model/roleModel')


const createCommunity = async (req, res) => {
  try {
    const { name } = req.body;

    const token = req.token
    const id = token.id

    if (Object.keys(req.body).length == 0) {
      return res.status(400).json({ message: 'Please provide name.' });
    }
    if (!name) {
      return res.status(400).json({ message: 'Please provide name' });
    }

    const slugCheck = await communityModel.findOne({ slug: name.toLowerCase() })

    if (slugCheck) {
      return res.status(400).json({ message: 'slug already exist.' });
    }

    let data = {
      name: name,
      slug: name.toLowerCase(),
      owner: id
    }

    const community = await communityModel.create(data)

    let commun = {
      id: community.id,
      name: community.name,
      slug: community.slug,
      owner: community.owner,
      created_at: community.createdAt,
      updated_at: community.updatedAt
    }

    const roles = await roleModel.find()

    console.log(roles)

    const adminId = roles.filter(item => item.name === 'Community Admin').map(item => item.id);

    console.log(adminId)

    let memberData = {
      community: community.id,
      user: id,
      role: adminId[0]
    }

    await memberModel.create(memberData)

    return res.status(201).json({ status: true, content: { data: commun } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getAllCommunity = async (req, res) => {
  try {
    const communities = await communityModel.find();
    var total = communities.length

    if (!communities) {
      return res.status(400).send({ message: 'No such Community there' });
    }
    return res.status(200).send({ status: true, content: { meta: { total: total } }, data: communities })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getAllMembers = async (req, res) => {
  try {
    const communityID = req.params.id;
    const communities = await memberModel.find({ community: communityID });
    const total = communities.length


    let ids = communities.map(items => items.user)

    let memArr = []
    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      let data = await User.findOne({ id: id })
      let members = {
        id: data.id,
        name: data.name,
        email: data.email
      }
      memArr.push(members)
    }

    if (!communities) {
      return res.status(400).send({ message: 'No such Community there' });
    }
    return res.status(200).send({ status: true, content: { meta: { total: total } }, data: memArr })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getOwnedCommunity = async (req, res) => {
  try {
    const token = req.token
    const id = token.id

    const communities = await communityModel.find({ owner: id });
    const total = communities.length

    if (!communities) {
      return res.status(400).send({ message: 'No such Community there' });
    }
    return res.status(200).send({ status: true, content: { meta: { total: total } }, data: communities })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};




const getmyjoinedcommunity = async (req, res) => {
  try {
    const token = req.token
    const id = token.id

    const myData = await memberModel.find({ user: id })
    const total = myData.length

    let ids = myData.map(items => items.community)

    let ownerArr = []
    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      let data = await communityModel.findOne({ id: id })
      let x = {
        id: data.id,
        name: data.name,
        slug: data.slug
      }
      ownerArr.push(x)
    }

    // let allData = []
    // for (let i = 0; i < ownerArr.length; i++) {
    //   let id = ownerArr[i]
    //   let data = await User.findOne({ id: id })
    //   let owners = {
    //     id: data.id,
    //     name: data.name
    //   }
    //   allData.push(owners)
    // }

    // const main = {
    //   data : ownerArr,
    //   owner: allData
    // }


    return res.status(200).send({ status: true, content: { meta: { total: total } }, data: ownerArr })

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}


module.exports = { createCommunity, getAllCommunity, getAllMembers, getOwnedCommunity, getmyjoinedcommunity };