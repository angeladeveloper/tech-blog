const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//TODO:: Add a delete route for the blog post

router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogPost = await Blog.update({
      where: {
        id: req.params.id,
      },
    })

    if (!blogPost) {
      res.status(404).json({ message: 'Sorry, No blog post was found 😔' });
      return;
    }

    res.status(200).json(blogPost);
  } catch (err) {
    res.status(400).json(err);
  }
})




module.exports = router;