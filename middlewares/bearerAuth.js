'use strict';

const { UserModel } = require( "../models/index" );

module.exports = async ( req, res, next ) => {
    if ( !req.headers.authorization ) {
        next( 'Invalid Login' );
    } else {
        const token = req.headers.authorization.split( ' ' ).pop();
        try {
            const validUser = await UserModel.authenticateToken( token );
            const user = await UserModel.findOne( {
                where: {
                    username: validUser.username
                }
            } );
            if ( user ) {
                req.user = user;
                req.token = user.token;
                next();
            } else {
                next( 'Invalid Login' );
            }
        } catch ( error ) {
            next( error );
        } 
    }
}