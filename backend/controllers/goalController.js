const asyncHandler = require("express-async-handler");

//@desc Get Goals
//@route GET /api/Goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals" });
});

//@desc Set Goals
//@route POST /api/Goals
//@access Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Set goals" });
});

//@desc Update Goals
//@route PUT /api/Goals
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goals ${req.params.id}` });
});

//@desc Delete Goals
//@route DELETE /api/Goals
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goals ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
