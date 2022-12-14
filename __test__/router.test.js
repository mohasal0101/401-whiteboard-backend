'use strict';

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

describe('server is working',()=>{
    it('should return 200',async()=>{
        const response=await request.get('/');
        expect(response.status).toEqual(200);
    });
}
);


describe('check post route is working',()=>{
    it('check post',async()=>{
        const response=await request.get('/post');
        expect(response.status).toEqual(200);
    }
    );
}
);


describe('check post get one route is working',()=>{
    it('check post get one',async()=>{
        const response=await request.get('/post/:id');
        expect(response.status).toEqual(200);
    }
    );
}
);




describe('post route is working',()=>{
    it('should return 200',async()=>{
        const response=await request.get('/post');
        expect(response.status).toEqual(200);
    });
}
);

describe('comment route is working',()=>{
    it('should return 200',async()=>{
        const response=await request.get('/comment');
        expect(response.status).toEqual(200);
    });
}
);

describe('create post route is working',()=>{
    it('should return 200',async()=>{
        const response=await request.post('/post');
        expect(response.status).toEqual(200);
    });
}
);

// add unit tests for all routs

describe('get one post route is working',()=>{
    it('should return 200',async()=>{
        const response=await request.get('/post/:id');
        expect(response.status).toEqual(200);
    });
}
);




