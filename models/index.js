"use strict";


const { Sequelize, DataTypes } = require('sequelize');

const Post = require('./post.model');
const Comment=require('./comment.model');
const User =require('./user.model');
const collenction=require('../collections/user-comment-routes');





require('dotenv').config();

const POSTGRES_URL = "postgres://cpmmniuxrjxjbm:77bd22b12f7e21a76ed6e4790f49d85dad631ac97dba54b1268a53ef6cd9fbf4@ec2-34-253-119-24.eu-west-1.compute.amazonaws.com:5432/daf7o0u2mtge7j";

const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}



let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);
const postModel=Post(sequelize, DataTypes);
const commentModal=Comment(sequelize, DataTypes);
const UserModal=User(sequelize, DataTypes);


sequelize.authenticate().then(() => {
  console.log('Database connected to postgres');
}).catch((err) => {
  console.log(err)
});


UserModal.hasMany(commentModal,{foreignKey:'userID', sourceKey:'id'});
commentModal.belongsTo(UserModal,{foreignKey:'userID', targetKey:'id'});

postModel.hasMany(commentModal,{foreignKey:'postID', sourceKey:'id'});
commentModal.belongsTo(postModel,{foreignKey:'postID', targetKey:'id'});


const postCollection=new collenction(postModel);
const commentCollection=new collenction(commentModal);

module.exports = {
  db:sequelize,
  Post:postCollection,
  Comment:commentCollection,
  commentModal:commentModal,
  UserModal:UserModal
}