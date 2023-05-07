import { Request, Response } from "express";
import { createCommentService, listCommentsService } from "../../services/announce/comment";
import { iUserToken } from "../../interfaces/announce";

interface AuthenticatedRequest extends Request {
    user: iUserToken;
  }
  
  export const createCommentController = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id_ann, comment } = req.body;
      const token = req.user;
      const createdComment = await createCommentService(id_ann, comment, token);
      res.status(201).json(createdComment);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };

export const listCommentsController = async (req: Request, res: Response) => {
  try {
    const { id_ann } = req.params;
    const comments = await listCommentsService(id_ann);
    res.status(200).json(comments);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};