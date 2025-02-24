const Auth = require('../../models/auth/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Login
// exports.login = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     const user = await Auth.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     if (user.role !== role) {
//       return res.status(400).json({ message: 'Incorrect role selected for user' });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.cookie('token', token, {
//       // httpOnly: true,
//       // secure: process.env.NODE_ENV === 'production',
//     });

//     // if (role === 'admin') {
//     //   return res.redirect('/');
//     // } else if (role === 'superadmin') {
//     //   return res.redirect('/superadmin-dashboard');
//     // }
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };




// exports.get= async (req, res) => {
//   try {
//     const user = await Auth.findById(req.userId).select('-password'); // Exclude password from the response
//     if (!user) {
//       return res.status(404).json({ message: 'User  not found' });
//     }
//     res.status(200).json({
//       id: user._id,
//       email: user.email,
//       role: user.role,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// }


// exports.getUser= async (userId) => {
//   try {
//     const user = await Auth.findById(userId).select('-password'); // Exclude password from the response
//     if (!user) {
//       throw new Error('User  not found');
//     }
//     return {
//       id: user._id,
//       email: user.email,
//       role: user.role,
//     };
//   } catch (error) {
//     throw new Error('Server error');
//   }
// };
exports.getLogin = async (req, res) => {
  try {
    // Assuming the user ID is stored in req.userId after token verification
    const user = await Auth.findById(req.userId).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Error fetching user details:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    console.log('Login attempt:', { email, role }); // Log the login attempt

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User  not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the role matches
    if (user.role !== role) {
      return res.status(400).json({ message: 'Incorrect role selected for user' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
    //     if (user.role === 'admin') {
    //   return res.redirect('/');
    // } else if (user.role === 'superadmin') {
    //   return res.redirect('/superadmin-dashboard');
    // }
  } catch (error) {
    console.error('Error during login:', error); // Log any errors
    res.status(500).json({ message: 'Server error', error });
  }
}



// Register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new Auth({
      name,
      email,
      password,
      role,
    });

    await user.save();
    res.status(201).json({ message: 'Registration successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Forget Password
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Auth.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
