const express = require("express");

const {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/", getStudents);
router.get("/:id",getStudent);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;