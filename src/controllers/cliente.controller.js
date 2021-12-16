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

/* insert into direccion  (direccion, direccion2, distrito, id_ciudad, codigo_postal , telefono)
values ('Xalapa 1', '', 'Xalapa 11', 156, 11111, '3333333');
SELECT LAST_INSERT_ID();

SELECT * FROM direccion  WHERE id_direccion = ?lastId; */
