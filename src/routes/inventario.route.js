const { Router } = require("express");
const router = Router();

const {
  getAllInventario,
  getInventarioById,
  createInventario,
  updateInventario,
  deleteInventario,
} = require("../controllers/inventario.controller");

router.get("/inventario", getAllInventario);
router.get("/inventario/:id", getInventarioById);
router.post("/inventario", createInventario);
router.put("/inventario/:id", updateInventario);
router.delete("/inventario/:id", deleteInventario);

module.exports = router;
