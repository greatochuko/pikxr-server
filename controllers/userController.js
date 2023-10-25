import { User } from "../models/User.js";

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function getUserProfile(req, res) {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function getUserFollowers(req, res) {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .populate({
        path: "followers",
        select: "username imageUrl fullname",
      })
      .populate({
        path: "following",
        select: "username imageUrl fullname",
      });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function validateEmail(req, res) {
  const { email } = req.body;
  try {
    const user = await User.find({ email });
    res.json({ userExists: user.length ? true : false });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function validateUsername(req, res) {
  const { username } = req.body;
  try {
    const user = await User.find({ username });
    res.json({ userExists: user.length ? true : false });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function searchUsers(req, res) {
  const { q } = req.query;
  try {
    const users = await User.find().select(
      "username fullname imageUrl followers"
    );
    const searchedUsers = users.filter(
      (u) => u.username.includes(q) || u.fullname.includes(q)
    );
    res.json(searchedUsers);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function followUser(req, res) {
  const { userId, userToFollowId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { following: userToFollowId },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(userToFollowId, {
      $push: { followers: userId },
    });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function unFollowUser(req, res) {
  const { userId, userToUnFollowId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { following: userToUnFollowId },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(userToUnFollowId, {
      $pull: { followers: userId },
    });
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function uploadCoverPhoto(req, res) {
  if (!req.files) return res.json({ error: "please select a file" });
  const { fileName } = req.body;
  const imageFileName =
    fileName.split(".")[0] + Date.now() + "." + fileName.split(".")[1];
  const { coverPhoto } = req.files;
  try {
    coverPhoto.mv("public/users/" + imageFileName, async (err) => {
      if (err) {
        res.json({ error: err.message });
      }
      await User.findByIdAndUpdate(req.userId, {
        coverPhotoUrl: imageFileName,
      });
      res.json("done");
    });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function uploadProfilePhoto(req, res) {
  if (!req.files) return res.json({ error: "Please select a file" });
  const { fileName } = req.body;
  const imageFileName =
    fileName.split(".")[0] + Date.now() + "." + fileName.split(".")[1];
  const { coverPhoto } = req.files;
  try {
    coverPhoto.mv("public/users/" + imageFileName, async (err) => {
      if (err) {
        res.json({ error: err.message });
      }
      const user = await User.findByIdAndUpdate(
        req.userId,
        { imageUrl: imageFileName },
        { new: true }
      );
      res.json(user);
    });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function editUserAbout(req, res) {
  const { about, userId } = req.body;
  if (userId !== req.userId)
    return res.status(403).json({ error: "Forbidden" });
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { about },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ error: err.message });
  }
}
