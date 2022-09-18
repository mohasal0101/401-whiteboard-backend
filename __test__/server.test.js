'use strict';

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

describe(' server is working', () => {
    it('should return 200', async () => {
        const response = await request.get( '/' );
        expect( response.status ).toEqual( 200 );
    } );
}
);



describe('get all post route is working', () => {
    it('should return 200', async () => {
        const response = await request.get( '/post' );
        expect( response.status ).toEqual( 200 );
    } );
}
);


describe('Get new comment route is working', () => {
    it('new comment', async () => {
        const response = await request.get( '/comment' );
        expect( response.status ).toEqual( 200 );
    }
    );
}
);

describe('delete a post route is working', () => {
    it('delete post', async () => {
        const response = await request.delete( '/post/:id' );
        expect( response.status ).toEqual( 204 );
    }
    );
}
);

/* //// Routes
router.get( '/post', getAllPosts );
router.get( '/post/:id', getOnePost );
router.post( '/post', newPost );
router.put( '/post/:id', updatePost );
router.delete( '/post/:id', deletePost ); */

describe('get one post route is working', () => {
    it('get one post', async () => {
        const response = await request.get( '/post/:id' );
        expect( response.status ).toEqual( 200 );
    }
    );
}
);

describe('create post route is working', () => {
    it('create new post', async () => {
        const response = await request.post( '/post' );
        expect( response.status ).toEqual( 200 );
    }
    );
}
);

describe('update post route is working', () => {
    it('update post', async () => {
        const response = await request.put( '/post/:id' );
        expect( response.status ).toEqual( 201 );
    }
    );
}
);

/* describe('delete post route is working', () => {
    it('delete post', async () => {
        const response = await request.delete( '/post/:id' );
        expect( response.status ).toEqual( 204 );
    }
    );
}
);
 */

describe('delete comment route is working', () => {
    it('delete comment', async () => {
        const response = await request.delete( '/comment/:id' );
        expect( response.status ).toEqual( 204 );
    }
    );
}
);
