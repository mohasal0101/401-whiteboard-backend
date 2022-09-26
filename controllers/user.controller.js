'use strict';
const bcrypt = require( 'bcrypt' );
const base64 = require( 'base-64' );
const { userModel } = require( '../models/index' );

const signup = async ( req, res ) => {
    try {
        req.body.password = await bcrypt.hash( req.body.password, 10 );
        const user = await userModel.create( req.body );
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
    const users = await userModel.findAll();
    res.status( 200 ).json( users );
};

const login = async ( req, res ) => {
    const basicHeader = req.headers.authorization.split( ' ' );
    const encodedValue = basicHeader.pop();
    const decodedValue = base64.decode( encodedValue );
    const [ username, password ] = decodedValue.split( ':' );
    console.log( username, password );
    const user = await userModel.findOne( {
        where: {
            username: username
                }
    } );
    if ( user ) {
        const isSame = await bcrypt.compare( password, user.password );
        if ( isSame ) {
            return res.status( 200 ).json( {
                "User": {
                    "username": user.username,
                    "id": user.id,
                },
                "token": user.token
            } );
        } else {
            return res.status( 401 ).send( 'You are not authorized' );
        }
    } else {
        return res.status( 401 ).send( 'You are not authorized' );
    }
};


module.exports = {
    signup,
    allUser,
    login
};