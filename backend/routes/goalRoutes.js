const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

// router.get("/", getGoals);
// router.post("/", setGoals);
// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").delete(protect, deleteGoals).put(protect, updateGoals);

module.exports = router;
