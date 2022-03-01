const User = require('../models/user.models');
const generateToken = require('../utils/jwt');

//register user
const register = async (req, res) => {
    try {
        const { userName, email, isAdmin, password, online, lastSeen } = req.body
        if (!userName || !email || !password)
            return res.status(400).json({ msg: "Please fill in all fields." })
        const userExists = await User.findOne({ email })
        if (userExists) res.status(400).json({ msg: 'User already Exists' })
        const newUser = await User.create({
            userName, email, isAdmin, password, online, lastSeen
        })
        if (password.length < 6)
            return res.status(400).json({ msg: "Password is at least 6 characters long." })
        if (newUser) {
            // status 201 means sth was CREATED
            res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                isAdmin: newUser.isAdmin,
                email: newUser.email,
                online: newUser.online,
                lastSeen: newUser.lastSeen,
                token: generateToken(newUser._id) // We want to authenticate right after we register
            })
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}
// login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: "User does not exist." })
        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })
        if (user) return res.json({
            userId: user._id,
            userName: user.userName,
            email: user.email,
            isAdmin: user.isAdmin,
            online: user.online,
            lastSeen: user.lastSeen,
            token: generateToken(user._id)
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = {
    register,
    login,
}