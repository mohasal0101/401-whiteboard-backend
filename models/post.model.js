"use strict";

const Post = (sequelize, DataTypes) =>
  sequelize.define("post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

module.exports = Post;