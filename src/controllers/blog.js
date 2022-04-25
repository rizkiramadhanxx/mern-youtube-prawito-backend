const { validationResult } = require("express-validator");
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
