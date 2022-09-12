"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const Post = require("./post.model");

const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://postgres:1312@localhost:5432/post";

const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

module.exports = {
  db: sequelize,
  Post: Post(sequelize, DataTypes),
};