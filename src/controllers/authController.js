import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import logger from '../utils/logger.js';

const loginUser = async (req, res) => {
  try {
    const { token, clientId } = req.body;
    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];
    const { email, name, picture } = payload;

    let user = await User.findOne({ userId });
    let isNewUser = false;

    if (!user) {
      user = new User({ userId, email, name, picture });
      user.accountCreated = Date.now();
      user.lastLogin = Date.now();
      isNewUser = true;

      await user.save();
    } else {
      await user.updateOne({ lastLogin: Date.now() });
    }

    const sessionToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: '365d' },
    );

    res.status(200).json({
      success: true,
      status: 200,
      isNewUser,
      userId,
      email,
      name,
      picture,
      accountCreated: user.accountCreated,
      jwt: sessionToken,
      message: 'Token validated',
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({
      success: false,
      status: 400,
      message: 'Invalid token',
    });
  }
};

export default loginUser;
