const { Router } = require("express");
const router = Router();

const {
  getAllAlmacen,
  getAllCiudad,
  getAllIdioma,
  getAllEmpleado,
} = require("../controllers/consultas.controller");

router.get("/consulta-alm", getAllAlmacen);
router.get("/consulta-ciu", getAllCiudad);
router.get("/consulta-idi", getAllIdioma);
router.get("/consulta-emp", getAllEmpleado);

module.exports = router;
