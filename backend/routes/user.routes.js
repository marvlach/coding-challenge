import express from "express";
import { getAllUsers, createUser, authUser, getUser } from "../controllers/user.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// all routes here start with /user
router.get('/', authenticateJWT, getAllUsers);

router.get("/:userId", authenticateJWT, getUser);

router.post('/add', createUser);

router.post('/login', authUser);

// router.put("/:userID", updateUser);

export default router;