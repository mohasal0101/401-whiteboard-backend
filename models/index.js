"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const Post = require("./post.model");
const comment = require("./comment.model");
const collection = require("../collections/user-comment-routes");

const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://postgres:1312@localhost:5432/post";


const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
const postCollection = new collection(postModel);
const commentsCollection =new collection(commentModel);
let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);
const postModel = Post(sequelize, DataTypes);
const commentModel = comment(sequelize, DataTypes);
module.exports = {
  db: sequelize,
  Post: postCollection,
  Comment: commentsCollection,
  commentModel: commentModel,
};