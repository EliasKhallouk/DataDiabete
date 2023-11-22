const {dbAuth} = require("../models");
const ROLES = dbAuth.ROLES;
const User = dbAuth.users;

//checkDuplicateUsernameOrEmail = (req, res, next) =>{}
//checkRolesExisted = (req, res, next) => {}

const verifySignUp = {};

module.exports = verifySignUp;
