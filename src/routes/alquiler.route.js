const { Router } = require("express");
const router = Router();

const {
  getAllAlquiler,
  getAllAlquilerById,
  createAlquiler,
  updateAlquiler,
  deleteAlquiler,
} = require("../controllers/alquiler.constroller");

router.get("/alquiler", getAllAlquiler);
router.get("/alquiler/:id", getAllAlquilerById);
router.post("/alquiler", createAlquiler);
router.put("/alquiler/:id", updateAlquiler);
router.delete("/alquiler/:id", deleteAlquiler);

module.exports = router;
