'use state';


const User = require( '../models' ).UserModel;
const base64 = require( 'base-64' );
const bcrypt = require( 'bcrypt' );

module.exports = async ( req, res, next ) => {
    if ( !req.headers.authorization ) {
        next( 'Invalid Login' );
    }
    const basicHeader = req.headers.authorization.split( ' ' );
    const encodedValue = basicHeader.pop();
    const decodedValue = base64.decode( encodedValue );
    const [ username, password ] = decodedValue.split( ':' );
    const user = await User.findOne( {
        where: {
            username: username
        }
    } );
    if ( user ) {
        const isSame = await bcrypt.compare( password, user.password );
        if ( isSame ) {
            req.user = user;
            next();
        } else {
            next( 'Invalid Login' );
        }
    } else {
        next( 'Invalid Login' );
    }
}

