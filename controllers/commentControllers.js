export async function getComments(req, res) {
  const comments = await Comment.find({ postId: req.params.postId });
  res.json(comments);
}

export async function postComment(req, res) {
  const { postId, comment, userId } = req.body;
  await Comment.create({ postId, comment, userId });
  res.json(await Comment.find());
}
