'use strict';

const express = require( 'express' );
const router = express.Router();
const { Post, CommentModel } = require( '../models/index' );

// Routes
router.get( '/post', getAllPosts );
router.get( '/post/:id', getOnePost );
router.post( '/post', newPost );
router.put( '/post/:id', updatePost );
router.delete( '/post/:id', deletePost );




async function getAllPosts ( req, res ) {
    /* istanbul ignore next */
    let posts = await Post.readWithComments( CommentModel );
    res.status( 200 ).json( {
        posts
    } );
}

/* istanbul ignore next */
async function getOnePost ( req, res ) {
    const id = req.params.id;
    const post = await Post.readOneWithComments( id, CommentModel );
    res.status( 200 ).json( post );
}

/* istanbul ignore next */
async function newPost ( req, res ) {
    const newPost = req.body;
    await Post.create( newPost )
        .then( async () => {
            await Post.read()
                .then( ( posts ) => {
                    res.status( 200 ).json( posts );
                } );
        } );
}

/* istanbul ignore next */
async function updatePost ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const post = await Post.update( id, obj );
    res.status( 201 ).json( post );
}

/* istanbul ignore next */
async function deletePost ( req, res ) {
    const id = req.params.id;
    await Post.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}



module.exports = router;