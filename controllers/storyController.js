import { Story } from "../models/Story.js";
import deleteFile from "../utils/deleteFile.js";
import { uploadPhoto } from "../utils/uploadPhoto.js";

export async function getStories(req, res) {
  try {
    const stories = await Story.find().populate({
      path: "creator",
      select: "username imageUrl fullname",
    });
    res.json(stories);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function createStory(req, res) {
  const { storyImage } = req.files;
  if (storyImage) {
    const { url } = await uploadPhoto(storyImage);
    req.body.imageUrl = url;
  }
  const { caption, creator, imageUrl } = req.body;
  try {
    const newStory = await Story.create({
      caption,
      creator,
      imageUrl,
    });

    res.json(newStory);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function deleteStory(req, res) {
  const { storyId } = req.params;
  try {
    const story = await Story.findByIdAndDelete(storyId);
    deleteFile("./public/stories/" + story.imageUrl);
    res.json(story);
  } catch (err) {
    res.json({ error: err.message });
  }
}
