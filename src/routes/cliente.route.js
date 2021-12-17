const { Router } = require("express");
const router = Router();

const {
  getAllClientes,
  deleteCliente,
  createCliente,
  getDireccionCliente,
  getClientesById,
} = require("../controllers/cliente.controller");

router.get("/cliente", getAllClientes);
router.get("/cliente/:id", getClientesById);
router.get("/cliente-dir/:id", getDireccionCliente);
router.delete("/cliente/:id", deleteCliente);
router.post("/cliente", createCliente);

module.exports = router;
