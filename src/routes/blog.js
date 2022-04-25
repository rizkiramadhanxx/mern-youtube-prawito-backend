const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const blogController = require("../controllers/blog");

// [POST] : /v1/blog/post
router.post(
  "/post",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("character must more than 5 title"),
    body("body")
      .isLength({ min: 5 })
      .withMessage("character must more than 5 body"),
  ],
  blogController.createBlogPost
);

module.exports = router;
