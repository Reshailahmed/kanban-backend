// import express, {RequestHandler} from "express";
// import bcrypt from "bcryptjs";
// import { User } from "../models/User";

// const router = express.Router();

// const loginController = async (
//   req: express.Request,
//   res: express.Response
// ): Promise<void> => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       console.log("User already exists:", email);
//       res.status(409).json({ message: "User already exists" });
//       return;
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();

//     console.log("✅ New user created:", email);
//     res.status(201).json({ message: "Signup successful" });
//   } catch (err) {
//     console.error("❌ Signup error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// router.post("/signup", loginController);

// export default router;









import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// SIGNUP CONTROLLER
const signupController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "Signup successful",
      token,
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN CONTROLLER
const loginController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ROUTES
router.post("/signup", signupController);
router.post("/login", loginController);

export default router;


