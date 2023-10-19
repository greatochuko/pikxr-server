import { Router } from "express";
import { createStory, getStories } from "../controllers/storyController.js";

const storyRouter = Router();

storyRouter.get("/stories", getStories);
storyRouter.post("/story/new", createStory);

export default storyRouter;
