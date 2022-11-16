import express from "express";
import { getCommentById, getComments, createComment } from "../controllers/comment.controller.js";
import { authenticateJWT, verifyUserExistense } from "../middlewares/auth.middleware.js";

const router = express.Router();

// all routes here start with /comment
router.get('/', authenticateJWT, verifyUserExistense, getComments);

router.get('/:commentId', authenticateJWT, verifyUserExistense, getCommentById);

router.post('/', authenticateJWT, verifyUserExistense, createComment);




export default router;