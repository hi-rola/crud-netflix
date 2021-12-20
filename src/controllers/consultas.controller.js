const db = require("../db/conexion-bd.js");

const getAllAlmacen = async (req, res) => {
  try {
    const response = await db.pool.query("select * from almacen");
    res.send(response);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getAllCiudad = async (req, res) => {
  try {
    const response = await db.pool.query(
      "select id_ciudad, nombre from ciudad"
    );
    res.send(response);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getAllIdioma = async (req, res) => {
  try {
    const response = await db.pool.query(
      "select id_idioma, nombre from idioma"
    );
    res.send(response);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

const getAllEmpleado = async (req, res) => {
  try {
    const response = await db.pool.query(
      "select id_empleado, nombre, apellidos from empleado"
    );
    res.send(response);
  } catch (err) {
    res.status(500).json({
      message:
        "Problemas al procesar la solicitud. Por favor intentelo más tarde.",
    });
  }
};

module.exports = {
  getAllAlmacen,
  getAllCiudad,
  getAllIdioma,
  getAllEmpleado,
};
