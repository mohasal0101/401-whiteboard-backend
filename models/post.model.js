'use strict';

const Post = ( sequelize, DataTypes ) => sequelize.define( 'Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'test worked'
    },
    img : {
        type: DataTypes.STRING,
        defaultValue: 'test worked!'
    }
} );

module.exports = Post;