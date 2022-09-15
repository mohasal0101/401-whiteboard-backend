'use strict';

module.exports = ( err, req, res, next ) => {
    /* istanbul ignore next */
    res.send( {
        code: 404,
        message: `Page Not Found`
    } );
};
