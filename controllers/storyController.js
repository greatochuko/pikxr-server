import { Story } from "../models/Story.js";

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
