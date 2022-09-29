const session = require('express-session');
const { User, Blog } = require('../models');
const sequelize = require('../config/connection');

const user = require('./user.json');
const blogPosts = require('./blogPost.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(user, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogPosts) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();