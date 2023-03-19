const roleModel= require('../Model/roleModel');


const createRole= async (req,res)=>{
    try {
        const { name, scopes } = req.body;

       
        const community = await roleModel.create(req.body)
        
        return res.status(201).json({status: true,content: {data: community} });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
    }



    const getRole= async (req,res)=>{
        try {

            const getData= await roleModel.find();
            const page= getData.length
            return res.status().send({status: true,content:{meta:{total:page}},data:getData})
            
        }  catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
          }
        }


    

        
module.exports={createRole,getRole}