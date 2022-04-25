const { validationResult } = require("express-validator");
const res = require("express/lib/response");
const BlogPost = require("../models/blog");

exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  // const image = req.file.path;
  const image = req.file.path.replace(/\\/g, "/");
  const body = req.body.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image harus diupload");
    err.errorStatus = 422;
    throw err;
  }

  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: {
      name: "Ojiii",
      uid: 1,
    },
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Blog Post Success",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAllBlogPost = (req, res, next) => {
  BlogPost.find()
    .then((result) => {
      res.status(200).json({
        message: "Data Blog Post berhasil dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPostById = (req, res, post) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("Blog Post tidak ditemukan");
        error.errorStatus(400);
        throw error;
      }
      res.status(200).json({
        message: "Data Blog berhasil ditemukan",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
