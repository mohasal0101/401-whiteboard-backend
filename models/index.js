'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const post = require( './post.model' );
const comment = require('./comment.model')
const POSTGRES_URL = process.env.DATABASE_URL || "postgres://cpmmniuxrjxjbm:77bd22b12f7e21a76ed6e4790f49d85dad631ac97dba54b1268a53ef6cd9fbf4@ec2-34-253-119-24.eu-west-1.compute.amazonaws.com:5432/daf7o0u2mtge7j";
const collection = require('../collections/user-comment-routes')
const user = require('./user.model');


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
const userModel = user(sequelize,DataTypes);


postModel.hasMany(commentModel, {foreignKey: 'ownerID', sourceKey: 'id'})
commentModel.belongsTo(postModel, {foreignKey: 'ownerID', targetKey: 'id'})

const postCollection = new collection(postModel);
const commentCollection =new collection(commentModel);



module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    CommentModel: commentModel,
    UserModel: userModel
};