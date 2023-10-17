import { Stories } from "../models/Stories.js";

export async function getStories(req, res) {
  const stories = await Stories.find().populate({
    path: "user",
    select: "username imgUrl fullname",
  });
  res.json(stories);
}

export async function postStory(req, res) {
  const { imgUrl, user } = req.body;
  const newStory = await Stories.create({ imgUrl, user });
  res.json(newStory);
}
