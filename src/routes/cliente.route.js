const { Router } = require("express");
const router = Router();

const {
  getAllClientes,
  deleteCliente,
  createCliente,
  getDireccionCliente,
  getClientesById,
  updateClienteDireccion,
  updateDireccion,
  getClienteIdNombre,
} = require("../controllers/cliente.controller");

router.get("/cliente", getAllClientes);
router.get("/cliente-idNom", getClienteIdNombre);
router.get("/cliente/:id", getClientesById);
router.get("/cliente-dir/:id", getDireccionCliente);
router.put("/cliente-dir/:id", updateDireccion);
router.delete("/cliente/:id", deleteCliente);
router.put("/cliente/:id", updateClienteDireccion);
router.post("/cliente", createCliente);

module.exports = router;
