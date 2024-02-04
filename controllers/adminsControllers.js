const Admin = require("../models/Admin");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllAdmins = asyncHandler(async (req, res) => {
  const users = await Admin.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found " });
  } else {
    return res.json(users);
  }
});

const getAdminById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: "User ID required" });
    }
  
    const user = await Admin.findById(id).select("-password").lean().exec();
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    return res.json(user);
  });

const createAdmin = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  //this helps confirm fields
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //checks for dups
  const duplicate = await Admin.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicated username" });
  }

  //hash pwds using salt rounds
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = { username, password: hashedPwd, roles };

  //storing new user
  const user = await Admin.create(userObject);

  if (user) {
    return res.status(201).json({ message: `new user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data " });
  }
});

const updateAdmin = asyncHandler(async (req, res) => {
    const {id, username, roles, active, password} = req.body

    //checks fields
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({message : 'all fields are required'})
    }

    const user = await Admin.findById(id).exec()

    if(!user) {
        return res.status(400).json({message : 'user not found'})
    }

    //checks dups
    const duplicate = await Admin.findOne({ username }).lean().exec()
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message : 'duplicate username'})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password) {
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    return res.json({message : `updated ${updatedUser.username}`})
});

const deleteAdmin = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id) {
        return res.status(400).json({message : 'User ID required'})
    }

    const user = await Admin.findById(id).exec()

    if(!user) {
        return res.status(400).json({ message : 'User does not exist'})
    }

    const result = await Admin.deleteOne()

    return res.json(`User ${result.username} has been deleted.`)
});

module.exports = { getAllAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin };
