const roleModel = require('../Model/roleModel');


const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    let scope = []
    if (name == "Community Admin") {
      scope.push(
        "member-get",
        "member-add",
        "member-remove"
      )
    } else if (name == "Community Member") {
      scope.push("member-get")
    } else {
      scope.push(
        "member-get",
        "member-remove"
      )
    }

    let data = {
      name: name,
      scopes: scope
    }

    const community = await roleModel.create(data)

    let commun = {
      id: community.id,
      name: community.name,
      created_at: community.createdAt,
      updated_at: community.updatedAt
    }

    return res.status(201).json({ status: true, content: { data: commun } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}



const getRole = async (req, res) => {
  try {

    const getData = await roleModel.find();
    const page = getData.length
    return res.status(200).send({ status: true, content: { meta: { total: page } }, data: getData })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}





module.exports = { createRole, getRole }