import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    logger.error('JWT not found', error);

    return res.status(401).json({
      success: false,
      status: 401,
      message: 'Unauthorized',
      isLoggedIn: false,
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken;
    next();
  } catch (error) {
    logger.error('Could not verify JWT', error);

    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      isLoggedIn: false,
    });
  }
};

export default authenticateUser;
