const User = require("../models/User");

const users = [
  {
    _id: "65b8e564ea5ce114184ccb96",
    name: "sys admin",
    email: "sysadmin@cwyd.com",
    password: '$2y$10$Ctu7nOehZn3w7Nclc6H/jedoX7XLy63pUrJJ3TRztJY7QyZSSusCy',
    isVerified: true,
    role: "Admin",
    __v: 0,
  },
  {
    _id: "65b8e564ea5ce114184ccb97",
    name: "John Doe",
    email: "johndoe@cwyd.com",
    password: "$2b$10$Ia8zqy6iYmLCGlpYNXO7X.WwGigFuVf1Ux/n/jP.yyOCozMkxsscK",
    isVerified: true,
    role: "Instructor",
    __v: 0
  },
  {
    _id: "65b8e564ea5ce114184ccb98",
    name: "Jane Smith",
    email: "janesmith@cwyd.com",
    password: "$2b$10$Ia8zqy6iYmLCGlpYNXO7X.qjZ.0mokqCvocUMIIehpVFpo7zDHIDu",
    isVerified: true,
    role: "Student",
    __v: 0
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
