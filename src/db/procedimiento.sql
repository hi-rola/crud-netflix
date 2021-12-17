/* Las tablas de Alquiler, Cliente, Inventario y Película */

DELIMITER $$
CREATE PROCEDURE insertDireccionAndCliente(
	IN _direccion VARCHAR(50),
	IN _direccion2 VARCHAR(50),
	IN _distrito VARCHAR(20),
	IN _id_ciudad SMALLINT,
	IN _codigo_postal VARCHAR(10),
	IN _telefono VARCHAR(20),
	IN _id_almacen SMALLINT, 
  IN _nombre VARCHAR(45), 
  IN _apellidos VARCHAR(45), 
  IN _email VARCHAR(50), 
  IN _activo BOOLEAN, 
  IN _fecha_creacion DATETIME 
)


BEGIN 
    INSERT INTO direccion  (direccion, direccion2, distrito, id_ciudad, codigo_postal , telefono)
      VALUES (_direccion, _direccion2, _distrito, _id_ciudad, _codigo_postal, _telefono);
    
    SET @_id_direccion = LAST_INSERT_ID(); 

    INSERT INTO cliente (id_almacen , nombre, apellidos, email , id_direccion, activo , fecha_creacion)
      VALUES (_id_almacen, _nombre, _apellidos, _email, @_id_direccion, _activo, _fecha_creacion);
END 
$$

/* -----------------------------------------------------------------------------------*/

CALL insertDireccionAndCliente('orienteee', '', 'Xalapa ver', 600, '91230', '2282690450', 1, 'Rolando', 'Alba', 'rool', 1, CURRENT_TIMESTAMP)

/* ---------------------------------------------------------------------------------------- */
INSERT INTO cliente (id_almacen , nombre, apellidos, email , id_direccion, activo , fecha_creacion)
VALUES (1, 'rolas', 'rolassss', 'rol@gmail.com', 47, 1, CURRENT_TIMESTAMP )

insert into direccion  (direccion, direccion2, distrito, id_ciudad, codigo_postal , telefono)
values ('Xalapa 1', '', 'Xalapa 11', 156, 11111, '3333333');
SELECT LAST_INSERT_ID();

/* ------------------------------------------------- */
DELIMITER $$
CREATE PROCEDURE getDireccionCliente(
	IN _id_cliente SMALLINT
)


BEGIN 
    select *
    from direccion
    where id_direccion =
          (select id_direccion
            from cliente 
            where id_cliente = _id_cliente
            );
END 
$$

/* -------------------------------------------------------------- */
