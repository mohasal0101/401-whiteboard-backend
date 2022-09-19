'use strict';

const { signup, allUser, login } = require( '../controllers/user.controller' );
const userAuth = require( '../middlewares/userAuth' );
const express = require( 'express' );

const router = express.Router();

router.post( '/signin', login );
router.post( '/signup', userAuth.saveUser, signup );
router.get( '/users', allUser );

module.exports = router;