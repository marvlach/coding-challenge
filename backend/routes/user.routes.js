import express from "express";
import { getUser, createUser, authUser, getUserById } from "../controllers/user.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// all routes here start with /user
router.get('/', authenticateJWT, getUser);

router.get("/:userId", authenticateJWT, getUserById);

router.post('/add', createUser);

router.post('/login', authUser);

// router.put("/:userID", updateUser);

export default router;