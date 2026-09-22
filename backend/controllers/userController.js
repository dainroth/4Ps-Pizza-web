import userModal from "../modals/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// login function
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Creds" });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error User Login" });
  }
};

// register function
const registerUser = async (req, res) => {
  const { username, name, password, email } = req.body;
  const displayName = name || username;

  try {
    if (!displayName || !email || !password) {
      return res.json({
        success: false,
        message: "Please enter your name, email, and password.",
      });
    }

    const exists = await userModal.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User Account already exist",
      });
    }

    // validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Your password must be at least 6 characters long.",
      });
    }

    // if everything work
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // then its create new user
    const newUser = new userModal({
      name: displayName,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error User Sign in" });
  }
};

export { loginUser, registerUser };
