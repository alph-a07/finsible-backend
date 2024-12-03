import express from "express";
import loginUser from "../controllers/authController.js";

const onboardingRouter = express.Router();

onboardingRouter.post("/googleSignIn", loginUser);

export default onboardingRouter;
