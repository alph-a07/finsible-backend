// controllers/authController.js
import { OAuth2Client } from "google-auth-library";
import User from "../models/userModel.js";
import logger from "../utils/logger.js";

const loginUser = async (req, res) => {
  try {
    const { token, cliendId } = req.body;
    const client = new OAuth2Client(cliendId);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: cliendId,
    });

    const payload = ticket.getPayload();
    const userId = payload["sub"];
    const { email, name, picture } = payload;

    let user = await User.findOne({ userId });
    let isNewUser = false;

    logger.info(user);

    if (!user) {
      user = new User({ userId, email, name, picture });
      user.accountCreated = Date.now();
      user.lastLogin = Date.now();
      isNewUser = true;

      await user.save();
    } else {
      await user.updateOne({ lastLogin: Date.now() });
    }

    logger.info(user);

    res.status(200).json({
      success: true,
      status: 200,
      isNewUser,
      userId,
      email,
      name,
      picture,
      accountCreated: user.accountCreated,
    });
  } catch (error) {
    logger.error(error);
    res
      .status(400)
      .json({ success: false, status: 400, message: "Invalid token" });
  }
};

export default loginUser;
