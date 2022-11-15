import express from "express";
import { 
    getUser, 
    createUser, 
    authUser, 
    getUserById, 
    signupUser, 
    updateUser, 
    deleteUser
} from "../controllers/user.controller.js";

import { authenticateJWT, verifyUserExistense } from "../middlewares/auth.middleware.js";

const router = express.Router();

// all routes here start with /user
router.get('/', authenticateJWT, verifyUserExistense, getUser);

router.get("/:userId", authenticateJWT, verifyUserExistense, getUserById);

router.post('/add', authenticateJWT, verifyUserExistense, createUser);

router.post('/signup', signupUser);

router.post('/login', authUser);

router.put("/:userId", authenticateJWT, verifyUserExistense, updateUser);

router.delete("/:userId", authenticateJWT, verifyUserExistense, deleteUser);

export default router;