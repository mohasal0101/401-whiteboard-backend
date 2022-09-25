'use strict';

module.exports =  ( sequelize, DataTypes ) => sequelize.define( 'Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: 'Null'
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'Testing content'
    },
    img : {
        type: DataTypes.STRING,
        defaultValue: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
} );