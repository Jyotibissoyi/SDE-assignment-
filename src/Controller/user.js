const bcrypt = require('bcryptjs');
const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');


const register= async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if(Object.keys(req.body).length==0){
        return res.status(400).json({ message: 'Please provide name, email, and password' });  
    }
    if (!name ) {
      return res.status(400).json({ message: 'Please provide name'});
    }
    if (!email ) {
        return res.status(400).json({ message: 'Please provide email'});
      }
      if (!password ) {
        return res.status(400).json({ message: 'Please provide password'});
      }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Send success response
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};





const login= async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and send token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ message: 'Signin successful', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {login, register};