const { Router } = require("express");
const router = Router();

const {
  getAllPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
  getPeliculaByIdNombre,
} = require("../controllers/pelicula.controller");

router.get("/pelicula", getAllPeliculas);
router.get("/pelicula/:id", getPeliculaById);
router.get("/pelicula-idNom", getPeliculaByIdNombre);
router.post("/pelicula", createPelicula);
router.put("/pelicula/:id", updatePelicula);
router.delete("/pelicula/:id", deletePelicula);

module.exports = router;
