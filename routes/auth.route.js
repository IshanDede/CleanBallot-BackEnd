const { register, login, getUser } = require('../controllers/auth');
const { authM } = require('../middleware');

const router = require('express').Router();

router
    .get("/auth/user/self", authM, getUser)
    .post("/auth/register",register)
    .post("/auth/login",login);

module.exports = router;