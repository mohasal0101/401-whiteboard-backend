'use strict';

const Post = ( sequelize, DataTypes ) => sequelize.define( 'Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'test done'
    },
    userID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    }
} );

module.exports = Post;