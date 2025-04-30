import express, {RequestHandler} from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

const router = express.Router();

const loginController = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists:", email);
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    console.log("✅ New user created:", email);
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


router.post("/signup", loginController);

export default router;
