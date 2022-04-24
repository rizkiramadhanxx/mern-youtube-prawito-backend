exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  // const image = req.body.image;
  const body = req.body.body;

  const result = {
    message: "Create Blog Post Success",
    data: {
      post_id: 1,
      title: title,
      // image: "imagefile.png",
      body: body,
      create_at: "12/06/2020",
      author: {
        uid: 1,
        name: "Testing",
      },
    },
  };
  res.status(201).json(result);
};
