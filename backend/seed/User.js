const User = require("../models/User");

const users = [
  {
    _id: "65b8e564ea5ce114184ccb96",
    name: "sys admin",
    email: "sysadmin@cwyd.com",
    password:'$2y$10$Ctu7nOehZn3w7Nclc6H/jedoX7XLy63pUrJJ3TRztJY7QyZSSusCy',
    isVerified: true,
    isAdmin: true,
    __v: 0,
  }
];

exports.seedUser = async () => {
  try {
    await User.insertMany(users);
    console.log("User seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
