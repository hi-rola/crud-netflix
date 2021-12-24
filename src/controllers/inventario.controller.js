const db = require("../db/conexion-bd.js");

const getAllInventario = async (req, res) => {
  try {
    const response = await db.pool.query(
      "select * from inventario order by id_inventario desc limit 100"
    );
    res.send(response);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getInventarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db.pool.query(
      "select * from inventario where id_inventario = ?",
      [id]
    );
    res.send(response[0]);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getPeliculaByIdInventario = async (req, res) => {
  const { id } = req.params;
  try {
    const reponse = await db.pool.query(
      "select id_pelicula from inventario where id_inventario = ?",
      [id]
    );
    res.send(reponse[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const createInventario = async (req, res) => {
  const { idPelicula, idAlmacen } = req.body;

  const query = `INSERT INTO inventario (id_pelicula, id_almacen) values (?,?);`;

  try {
    const response = await db.pool.query(query, [idPelicula, idAlmacen]);
    console.log(response);
    res.status(200).json({
      message: "Inventario registrado exitosamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const updateInventario = async (req, res) => {
  const { id } = req.params;

  const { idPelicula, idAlmacen } = req.body;

  const query = `UPDATE inventario  set id_pelicula = ?, id_almacen = ? where id_inventario = ?;`;

  try {
    const response = await db.pool.query(query, [idPelicula, idAlmacen, id]);
    res.status(200).json({
      message: "Información actualizada exitosamente",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const deleteInventario = async (req, res) => {
  try {
    const { id } = req.params;

    const reponse = await db.pool.query(
      "delete from inventario where id_inventario = ?",
      [id]
    );
    res.status(200).json({
      message: "Inventario eliminado exitosamente",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

module.exports = {
  getAllInventario,
  getInventarioById,
  createInventario,
  updateInventario,
  deleteInventario,
  getPeliculaByIdInventario,
};
