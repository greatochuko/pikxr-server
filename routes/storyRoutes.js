import { Router } from "express";
import {
  createStory,
  deleteStory,
  getStories,
} from "../controllers/storyController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const storyRouter = Router();

storyRouter.get("/stories", authenticate, getStories);
storyRouter.post("/stories", authenticate, createStory);
storyRouter.delete("/story/:storyId", authenticate, deleteStory);

export default storyRouter;
