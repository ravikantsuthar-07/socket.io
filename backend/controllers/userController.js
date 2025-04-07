import Auth from "../models/authModel.js";

export const getUser = async (req, res) => {
  try {
    const user = await Auth.findOne({ email: req.params.email });
    res.json(user || {});
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};