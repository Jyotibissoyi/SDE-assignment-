const express = require("express")
const router = express.Router();

const { login, register, getMe } = require('../Controller/user')
const { createRole, getRole } = require('../Controller/role')
const { authentication, authorization } = require("../Middleware/auth")
const { createCommunity, getAllCommunity, getAllMembers, getOwnedCommunity, getmyjoinedcommunity } = require('../Controller/community')
const { addMember, deleteMember } = require('../Controller/member')
//=================================================================Importing modules================================================================>


router.post('/v1/auth/signup', register)
router.post('/v1/auth/signin', login)
router.get('/v1/auth/me', authentication, getMe)

router.post('/v1/role', createRole)
router.get('/v1/role', getRole)



router.post('/v1/community', authentication, createCommunity)
router.get('/v1/community', getAllCommunity)
router.get('/v1/community/me/owner', authentication, getOwnedCommunity)
router.get('/v1/community/:id/members', getAllMembers)
router.get('/v1/community/me/member',authentication, getmyjoinedcommunity)


router.post('/v1/member', authentication, addMember)
router.delete('/v1/member/:id', authentication, deleteMember)










module.exports = router