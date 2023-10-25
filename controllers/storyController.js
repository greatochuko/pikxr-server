import { Story } from "../models/Story.js";
import deleteFile from "../utils/deleteFile.js";

export async function getStories(req, res) {
  const stories = await Story.find().populate({
    path: "creator",
    select: "username imageUrl fullname",
  });
  res.json(stories);
}

export async function createStory(req, res) {
  const { caption, creator } = req.body;
  const { storyImage } = req.files;
  const fileName = `${storyImage.name.split(".")[0]}${Date.now()}.${
    storyImage.name.split(".")[1]
  }`;
  storyImage.mv("public/stories/" + fileName, async (err) => {
    if (err) {
      console.log("Error", err);
    } else {
      const newStory = await Story.create({
        caption: caption,
        creator: creator,
        imageUrl: fileName,
      });

      res.json(newStory);
    }
  });
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
