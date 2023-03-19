const User = require('../Model/userModel');
const CommunityModel = require('../Model/communityModel');


const createCommunity = async (req, res) => {
  try {
    const { name, slug, owner } = req.body;
    const ownerData = await User.findById({ id: owner })

    if (Object.keys(req.body).length == 0) {
      return res.status(400).json({ message: 'Please provide name, slug, owner details' });
    }
    if (!name) {
      return res.status(400).json({ message: 'Please provide name' });
    }
    if (!slug) {
      return res.status(400).json({ message: 'Please provide  slug' });
    }
    if (!owner) {
      return res.status(400).json({ message: 'Please provide owner details' });
    }
    if (!ownerData) {
      return res.status(400).json({ message: 'Please provide valid owner ID' });
    }


    const community = await CommunityModel.create(req.body)

    return res.status(201).json({ community });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getCommunity = async (req, res) => {
  try {
    const communities = await CommunityModel.find();
    var total = getData.length

    if (!communities) {
      return res.status(400).send({ message: 'No such Community there' });
    }
    return res.status(200).send({ status: true, content: { meta: { total: page, page:total } }, data: communities })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getCommunitybyId = async (req, res) => {
  try {
    const communityID = req.params;
    const communities = await CommunityModel.findById({ id: communityID });
    const page = getData.length

    if (!communities) {
      return res.status(400).send({ message: 'No such Community there' });
    }
    return res.status(200).send({ status: true, content: { meta: { total:total,total: page } }, data: communities })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getCommunitybyOwner = async (req, res) => {
  try {
    const Data = req.query;
    if(!req.query.owner){
        return res.status(400).json({ message: 'Please provide owner ID' });  
    }
    
    const communities = await CommunityModel.find({ owner: Data });
    const page = getData.length

    if (!communities) {
      return res.status(400).send({ message: 'No such Community there' });
    }
    return res.status(200).send({ status: true, content: { meta: { total:total, total: page } }, data: communities })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { createCommunity, getCommunity, getCommunitybyId, getCommunitybyOwner };