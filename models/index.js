'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const post = require( './post.model' );
const comment = require('./comment.model')
const POSTGRES_URL = process.env.DATABASE_URL || "postgres://vvhjywzvxbcqqt:e41b904e5cca6e8e0873ee39f828222669474e387fe5b4fa4d5c37b4c82fd850@ec2-54-246-185-161.eu-west-1.compute.amazonaws.com:5432/dc1q397lnip5a";
const collection = require('../collections/user-comment-routes')

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

let sequelize = new Sequelize( POSTGRES_URL, sequelizeOption );
const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize,DataTypes);

postModel.hasMany(commentModel, {foreignKey: 'ownerID', sourceKey: 'id'})
commentModel.belongsTo(postModel, {foreignKey: 'ownerID', targetKey: 'id'})

const postCollection = new collection(postModel);
const commentCollection =new collection(commentModel);



module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    CommentModel: commentModel
};