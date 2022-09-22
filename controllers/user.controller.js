'use strict';
const bcrypt = require( 'bcrypt' );
const base64 = require( 'base-64' );
const { UserModel } = require( '../models/index' );

const signup = async ( req, res ) => {
    try {
        req.body.password = await bcrypt.hash( req.body.password, 10 );
        const user = await UserModel.create( req.body );
        const output = {
            user: user,
            token: user.token
        };
        res.status( 201 ).json( output );
    } catch ( error ) {
        res.status( 403 ).send( 'Error Creating User' );
    }
};

const allUser = async ( req, res ) => {
    const users = await UserModel.findAll();
    res.status( 200 ).json( users );
};

const login = async ( req, res ) => {
    try {
        const user = await UserModel.findOne( { where: { username: req.body.username } } );
        const valid = await bcrypt.compare( req.body.password, user.password );
        if ( valid ) {
            const output = {
                user: user,
                token: user.token
            };
            res.status( 200 ).json( output );
        } else {
            throw new Error( 'Invalid Login' );
        }
    } catch ( error ) {
        res.status( 403 ).send( 'Invalid Login' );
    }
};



module.exports = {
    signup,
    allUser,
    login
};