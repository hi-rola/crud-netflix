const db = require("../db/conexion-bd.js");

const getAllClientes = async (req, res) => {
  try {
    const result = await db.pool.query(
      "select * from cliente order by id_cliente desc"
    );
    res.send(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getClientesById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.pool.query(
      "select * from cliente where id_cliente = ?",
      [id]
    );
    res.send(result);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const createCliente = async (req, res) => {
  const {
    direccion,
    direccion2,
    distrito,
    id_ciudad,
    codigo_postal,
    telefono,
    id_almacen,
    nombre,
    apellidos,
    email,
    activo,
    fecha_creacion,
  } = req.body;

  const query = `
  CALL insertDireccionAndCliente (?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?)
  `;
  try {
    const result = await db.pool.query(query, [
      direccion,
      direccion2,
      distrito,
      id_ciudad,
      codigo_postal,
      telefono,
      id_almacen,
      nombre,
      apellidos,
      email,
      activo,
      fecha_creacion,
    ]);
    res.status(200).json({
      message: "Cliente registrado exitosamente",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const id_cliente = req.params.id;
    const result = await db.pool.query(
      "delete from cliente where id_cliente = ?",
      [id_cliente]
    );
    res.status(200).json({
      message: "Cliente eliminado exitosamente.",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getDireccionCliente = async (req, res) => {
  const { id } = req.params;

  const query = `
  CALL getDireccionCliente (?)
  `;

  try {
    const result = await db.pool.query(query, [id]);
    res.send(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

module.exports = {
  getAllClientes,
  deleteCliente,
  createCliente,
  getDireccionCliente,
  getClientesById,
};
