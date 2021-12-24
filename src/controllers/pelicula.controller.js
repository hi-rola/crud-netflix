const db = require("../db/conexion-bd.js");

const getAllPeliculas = async (req, res) => {
  try {
    const result = await db.pool.query(
      "select * from pelicula order by id_pelicula desc"
    );
    res.send(result);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getPeliculaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.pool.query(
      "select * from pelicula where id_pelicula = ?",
      [id]
    );
    res.send(result[0]);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getPeliculaByIdNombre = async (req, res) => {
  try {
    const result = await db.pool.query(
      "select id_pelicula, titulo from pelicula order by id_pelicula desc"
    );
    res.send(result);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const createPelicula = async (req, res) => {
  const {
    titulo,
    descripcion,
    anyo_lanzamiento,
    id_idioma,
    duracion_alquiler,
    rental_rate,
    duracion,
    replacement_cost,
    clasificacion,
    caracteristicas_especiales,
  } = req.body;

  const query = `INSERT INTO pelicula (titulo,
    descripcion,
    anyo_lanzamiento,
    id_idioma,
    duracion_alquiler,
    rental_rate,
    duracion,
    replacement_cost,
    clasificacion,
    caracteristicas_especiales) values (?,?,?,?,?,?,?,?,?,?);`;

  try {
    const result = await db.pool.query(query, [
      titulo,
      descripcion,
      anyo_lanzamiento,
      id_idioma,
      duracion_alquiler,
      rental_rate,
      duracion,
      replacement_cost,
      clasificacion,
      caracteristicas_especiales,
    ]);

    res.status(200).json({
      message: "Película registrada exitosamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const updatePelicula = async (req, res) => {
  const { id } = req.params;

  const {
    titulo,
    descripcion,
    anyo_lanzamiento,
    id_idioma,
    duracion_alquiler,
    rental_rate,
    duracion,
    replacement_cost,
    clasificacion,
    caracteristicas_especiales,
  } = req.body;

  const query = `UPDATE pelicula set titulo = ?,
    descripcion = ?,
    anyo_lanzamiento = ?,
    id_idioma = ?,
    duracion_alquiler = ?,
    rental_rate = ?,
    duracion = ?,
    replacement_cost = ?,
    clasificacion = ?,
    caracteristicas_especiales = ? where id_pelicula = ?`;

  try {
    const result = await db.pool.query(query, [
      titulo,
      descripcion,
      anyo_lanzamiento,
      id_idioma,
      duracion_alquiler,
      rental_rate,
      duracion,
      replacement_cost,
      clasificacion,
      caracteristicas_especiales,
      id,
    ]);

    res.status(200).json({
      message: "Información actualizada exitosamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const deletePelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const reponse = await db.pool.query(
      "delete from pelicula where id_pelicula = ?",
      [id]
    );
    res.status(200).json({
      message: "Película eliminado exitosamente.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

module.exports = {
  getAllPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
  getPeliculaByIdNombre,
};
