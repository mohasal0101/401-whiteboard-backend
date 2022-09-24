'use strict';

const {UserModal}=require('../models/index');
module.exports = async (req, res, next) => {
  if( !req.headers.authorization ) (
    next('Invalid login')
  )
  const token = req.headers.authorization.split(' ')[1]
  try {
    const validUser = UserModal.authenticateToken(token);
    console.log(validUser);
    const userInfo = await UserModal.findOne({where: {username: validUser.username}});
    if(userInfo) {
      req.user = userInfo;
      req.token = userInfo.token
      next();
    } else {
      next('Invalid login')
    }

  } catch(e) {
    next(e.message || e)
  }
}
