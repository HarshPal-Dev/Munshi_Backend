const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { sequelize } = require('../database/connection'); // Adjust the path as needed
const Student = require('../models/Student'); // Adjust the path as needed

// Controller function for student signup
const signupStudent = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rollNo, branchName, roomNo, hostelBlockName, password } = req.body;

  try {
    // Check if student already exists
    let student = await Student.findOne({ where: { rollNo } });

    if (student) {
      return res.status(400).json({ errors: [{ msg: 'Student already exists' }] });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create student record
    student = await Student.create({
      rollNo,
      branchName,
      roomNo,
      hostelBlockName,
      password: hashedPassword
    });

    // Create JWT token
    const payload = {
      student: {
        id: student.id,
        rollNo: student.rollNo
        // You can add more fields to the payload if needed
      }
    };

    jwt.sign(
      payload,
      'yourjwtsecret', // Replace with your own secret key for JWT signing
      { expiresIn: '1h' }, // Token expiration time
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { signupStudent };
