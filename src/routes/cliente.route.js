const { Router } = require("express");
const router = Router();

const {
  getAllClientes,
  deleteCliente,
} = require("../controllers/cliente.controller");

router.get("/cliente", getAllClientes);
router.delete("/cliente/:id", deleteCliente);

module.exports = router;
