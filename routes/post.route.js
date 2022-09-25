'use strict';

const express = require( 'express' );
const router = express.Router();

const { postCollection } = require( '../models/post.model' );
const { commentModel } = require( '../models/comment.model' );
const bearerAuth = require( '../middlewares/bearerAuth' );



router.get( '/post', bearerAuth, getAllPost);
router.get( '/post/:id', getOnePost );
router.post( '/post', newPost );
router.put( '/post/:id', updatePost );
router.delete( '/post/:id', deletePost );



async function getAllPost ( req, res ) {
    const posts = await postCollection.read();
    res.status( 200 ).json( posts );
}


async function getOnePost ( req, res ) {
    const id = req.params.id;
    const post = await postCollection.read( id );
    res.status( 200 ).json( post );
}



async function newPost ( req, res ) {
    const newPost = req.body;
    await postCollection.create( newPost )
        .then( async () => {
            await postCollection.read()
                .then( ( posts ) => {
                    res.status( 201 ).json( posts );
                } );
        } );
}


async function updatePost ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const post = await postCollection.update( id, obj );
    res.status( 201 ).json( post );
}

async function deletePost ( req, res ) {
    const id = req.params.id;
    const comments = await commentModel.findAll( {
        where: {
            postID: id
        }
    } );
    comments.forEach( async ( comment ) => {
        await commentModel.destroy( {
            where: {
                id: comment.id
            }
        } );
    } );
    await postCollection.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}



module.exports = router;