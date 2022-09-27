'use strict';

module.exports = ( sequelize, DataTypes ) => sequelize.define( 'Comment', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'test'
    },
    postID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
} );