'use strict';

module.exports = ( err, req, res, next ) => {
        /* istanbul ignore next */
    res.send( {
        code: 500,
        message: `Server Error`
    } );
};