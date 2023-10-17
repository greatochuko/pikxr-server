import { Router } from "express";
import { getStories, postStory } from "../controllers/storyController.js";

const storyRouter = Router();

storyRouter.get("/stories", getStories);
storyRouter.post("/story", postStory);

export default storyRouter;
