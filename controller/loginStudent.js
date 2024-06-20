const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); // Adjust the path as needed

// Controller function for student login
const loginStudent = async (req, res) => {
  const { rollNo, password } = req.body;

  try {
    // Check if student exists
    const student = await Student.findOne({ rollNo });

    if (!student) {
      return res.status(404).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

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

module.exports = { loginStudent };
