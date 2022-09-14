"use strict";

const Comment = (sequelize, DataTypes) =>
  sequelize.define("Comments", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentAuthor: {
      type: DataTypes.STRING,
      defaultValue: "Anonymous LTUC Member",
    },
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = Comment;