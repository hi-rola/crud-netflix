const db = require("../db/conexion-bd.js");

const getAllClientes = async (req, res) => {
  try {
    const reponse = await db.pool.query(
      "select * from cliente order by id_cliente desc"
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

const getClientesById = async (req, res) => {
  const { id } = req.params;
  try {
    const reponse = await db.pool.query(
      "select * from cliente where id_cliente = ?",
      [id]
    );
    res.send(reponse[0]);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getClienteIdNombre = async (req, res) => {
  try {
    const reponse = await db.pool.query(
      "select id_cliente, nombre, apellidos from cliente order by id_cliente desc limit 50"
    );
    res.send(reponse);
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
    idCiudad,
    codigo_postal,
    telefono,
    idAlmacen,
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
    const reponse = await db.pool.query(query, [
      direccion,
      direccion2,
      distrito,
      idCiudad,
      codigo_postal,
      telefono,
      idAlmacen,
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

const updateClienteDireccion = async (req, res) => {
  const { id } = req.params;

  const {
    direccion,
    direccion2,
    distrito,
    idCiudad,
    codigo_postal,
    telefono,
    idAlmacen,
    nombre,
    apellidos,
    email,
    activo,
    fecha_creacion,
    id_direccion,
  } = req.body;

  const query = `CALL updateDireccionAndCliente (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
  try {
    const response = db.pool.query(query, [
      direccion,
      direccion2,
      distrito,
      idCiudad,
      codigo_postal,
      telefono,
      idAlmacen,
      nombre,
      apellidos,
      email,
      activo,
      fecha_creacion,
      id_direccion,
      id,
    ]);

    res.status(200).json({
      message: "Información actualizada exitosamente",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde",
    });
  }
};

const updateDireccion = async (req, res) => {
  const {
    direccion,
    direccion2,
    distrito,
    id_ciudad,
    codigo_postal,
    telefono,
  } = req.body;

  const { id } = req.params;

  const query = `UPDATE direccion set direccion = ?,
    direccion2 = ?,
    distrito = ?,
    id_ciudad = ?,
    codigo_postal= ?,
    telefono = ? WHERE id_direccion = ?`;
  try {
    const response = db.pool.query(query, [
      direccion,
      direccion2,
      distrito,
      id_ciudad,
      codigo_postal,
      telefono,
      id,
    ]);

    res.status(200).json({
      message: "Información actualizada exitosamente",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde",
    });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const id_cliente = req.params.id;
    const reponse = await db.pool.query(
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
    const reponse = await db.pool.query(query, [id]);
    res.send(reponse[0]);
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
  updateClienteDireccion,
  updateDireccion,
  getClienteIdNombre,
};
