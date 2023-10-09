export async function getUser(req, res) {
  res.json(req.user || "unable to get user");
}
