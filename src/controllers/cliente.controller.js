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

module.exports = {
  getAllClientes,
  deleteCliente,
};
