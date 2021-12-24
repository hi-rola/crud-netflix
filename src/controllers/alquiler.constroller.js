const db = require("../db/conexion-bd.js");

const getAllAlquiler = async (req, res) => {
  try {
    const reponse = await db.pool.query(
      "select * from alquiler order by id_alquiler desc"
    );
    res.send(reponse);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getAllAlquilerById = async (req, res) => {
  const { id } = req.params;
  try {
    const reponse = await db.pool.query(
      "select * from alquiler where id_alquiler = ?",
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

const createAlquiler = async (req, res) => {
  const {
    id_pelicula,
    fecha_alquiler,
    id_cliente,
    fecha_devolucion,
    id_empleado,
  } = req.body;

  const query = `
  CALL insertAlquiler (?, ?, ?, ?, ?)
  `;
  try {
    const reponse = await db.pool.query(query, [
      id_pelicula,
      fecha_alquiler,
      id_cliente,
      fecha_devolucion,
      id_empleado,
    ]);
    res.status(200).json({
      message: "Alquiler registrado exitosamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const updateAlquiler = async (req, res) => {
  const { id } = req.params;
  const {
    id_pelicula,
    fecha_alquiler,
    id_cliente,
    fecha_devolucion,
    id_empleado,
  } = req.body;

  const query = `
  CALL updateAlquiler (?, ?, ?, ?, ?, ?)
  `;
  try {
    const reponse = await db.pool.query(query, [
      id_pelicula,
      fecha_alquiler,
      id_cliente,
      fecha_devolucion,
      id_empleado,
      id,
    ]);
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

const deleteAlquiler = async (req, res) => {
  try {
    const id_alquiler = req.params.id;
    const reponse = await db.pool.query(
      "delete from alquiler where id_alquiler = ?",
      [id_alquiler]
    );
    res.status(200).json({
      message: "Alquiler eliminado exitosamente",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

module.exports = {
  getAllAlquiler,
  getAllAlquilerById,
  createAlquiler,
  updateAlquiler,
  deleteAlquiler,
};
