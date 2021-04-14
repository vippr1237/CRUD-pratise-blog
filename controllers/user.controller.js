const mongoose = require('mongoose');
const User = require('../models/user.model');
const {registerValidator, loginValidator} = require('../common/validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getProfile = async (req, res) =>{
    const user = await User.findById(req.params.id);
    try {
        res.render('profile', {user: User});
    }
    catch (err) {
        console.log(err);
    }
}

const register = async (req, res) =>{
    const userNameExist = await User.findOne({username: req.body.username})
    const emailExist = await User.findOne({email: req.body.email})
    if (userNameExist) 
        return res.json("Username already exist");
    if (emailExist)
        return res.json("Email already exist");
    const { error } = registerValidator(req.body);
    if (error)
        return res.json(error.details[0].message); 
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
    }); 
    try{
        newUser.save();
        res.redirect('/user/login');
    }
    catch (err) {
        console.log(err);
    }
}

const deleteUser = async (req, res) =>{
    try {
        if (req.params.id == req.user._id){
        const deleted = await User.remove({_id: req.user._id});
        res.status(200).send(deleted);
        } else {
            res.status(403).send("You're not allowed to delete this user")
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const updateProfile = async (req, res) =>{
    try {
        if (req.params.id == req.user._id) {
        const updated = await User.updateOne({_id: req.user._id},
        {$set: 
            {
                email: req.body.email, 
                dob: req.body.dob, 
                firstName: req.body.firstName, 
                lastName: req.body.lastName, 
                address: req.body.address
            }
        });
        res.status(200).send(updated);
        } else {
            res.status(403).send(`You're not allowed to take action`);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const login = async (req, res) =>{
    try{
        const { error } = loginValidator(req.body);
        if (error) return res.json(error.details[0].message);
        const user = await User.findOne({ $or : [{username : req.body.username}, {email : req.body.username}]});
        if (!user) return res.json('Email or username does not exist');
        const compare = await bcrypt.compare(req.body.password, user.password);
        if (!compare) return res.json('Wrong password');
        // create token - session
        const token = jwt.sign({_id : user._id}, process.env.TOKEN, {expiresIn: '1 days'});
        res.header('auth-token', token).json({token: token, redir:'/'});
    }
    catch (err) {
        res.json(err);
    }
}


const changePass = async (req, res) =>{
    try {
    const updated = await User.updateOne({_id: req.user._id},
    {$set: {password: req.body.password}});
    res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const viewRegister = (req, res) =>{ 
    res.render('register');
}

function viewSignIn(req, res) {
    res.render('signin');
}

function viewEditProfile(req, res) {
    res.render('editprofile');
}


module.exports = {
    getProfile: getProfile,
    register: register,
    viewRegister: viewRegister,
    deleteUser: deleteUser,
    updateProfile: updateProfile,
    changePass: changePass,
    login: login,
    viewSignIn: viewSignIn,
    viewEditProfile: viewEditProfile
}

