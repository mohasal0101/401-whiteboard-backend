'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const notFoundHandler  = require( './error-handlers/404' );
const error  = require( './error-handlers/500' );
const postRouter = require( './routes/post.route' );
const commentRouter = require( './routes/comment-route' );
const userRouter = require( './routes/user.route' );

app.use( cors() );
app.use( express.json() );
app.use( postRouter );
app.use( commentRouter );
app.use( userRouter );
app.use( notFoundHandler  );
app.use( error  );

app.get( '/', ( req, res ) => {
    res.status( 200 ).json( {
        message: 'Home page',
        code: 200
    } );
} );



function start ( port ) {
    app.listen( port, () => console.log( `Port is running on ${port}` ) );
}

module.exports = {
    start,
    app
};