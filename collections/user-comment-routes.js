'use strict';

class userCommentRoutes {
    constructor ( model ) {
        this.model = model;
    }
        /* istanbul ignore next */
    async create ( obj ) {
        /* istanbul ignore next */
        try {
            return await this.model.create( obj );
        } catch ( e ) {
            console.error( 'Error during the creation' );
        }
    }

    /* istanbul ignore next */
    async read ( id ) {
        /* istanbul ignore next */
        try {
            if ( id ) {
                return await this.model.findOne( { where: { id: id } } );
            } else {
                return await this.model.findAll();
            }
        } catch ( e ) {
            console.error( `Error in reading data with the id: ${id}` );
        }
    }
    /* istanbul ignore next */
    async update ( id, obj ) {
        /* istanbul ignore next */
        try {
            const dataById = await this.model.findOne( { where: { id } } );
            return await dataById.update( obj );
        } catch ( e ) {
            console.error( `Error while updating data with id: ${id}` );
        }
    }

    async delete ( id ) {
        /* istanbul ignore next */
        try {
            return await this.model.destroy( { where: { id } } );
        } catch ( e ) {
            console.error( `Error while deleting the data with id: ${id}` );
        }
    }

    async readWithComments ( Comment ) {
        /* istanbul ignore next */
        try {
            return await this.model.findAll( { include: [ Comment ] } );
        } catch ( e ) {
            console.error( `Error while reading the Comments for model ${this.model.name}` );
        }
    }

    async readOneWithComments ( id,Comment ) {
        /* istanbul ignore next */
        try {
            return await this.model.findOne( {where: { id } ,include: [ Comment ] } );
        } catch ( e ) {
            console.error( `Error while reading the Comments for model id ${id}` );
        }
    }

}

module.exports = userCommentRoutes;