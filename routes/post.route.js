"use strict";

const express = require("express");
const router = express.Router();
const error500 = require("../error-handlers/500");

const { Post } = require("../models/index");

// Routes
router.get("/post", getPosts);
router.get("/post/:id", error500, getPost);
router.post("/post", createPost);
router.put("/post/:id", error500, updatePost);
router.delete("/post/:id", error500, deletePost);

async function getPosts(req, res) {
  let allPosts = await Post.findAll();
  res.status(200).json({
    allPosts,
  });
}

async function getPost(req, res) {
  const id = req.params.id;
  const post = await Post.findOne({
    where: { id: id },
  });

  res.status(200).json(post);
}

async function createPost(req, res) {
  
  const newPost = req.body;
  const post = await Post.create(newPost);
  res.status(201).json(post);
}

async function updatePost(req, res) {
  const id = req.params.id;
  const obj = req.body;
  const post = await Post.findOne({
    where: { id: id },
  });

  const updatedPost = await post.update(obj);

  res.status(200).json(updatedPost);
}

// function delete post
async function deletePost(req, res) {
  const id = req.params.id;
  const post = await Post.findOne({
    where: { id: id },
  });
  const deletedPost = await post.destroy();
  res.status(204).json(deletedPost);
}

module.exports = router;