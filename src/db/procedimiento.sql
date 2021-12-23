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

/* ------------------------------------------- */

DELIMITER $$
CREATE PROCEDURE updateDireccionAndCliente(
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
  IN _fecha_creacion DATETIME,
  IN _id_direccion SMALLINT,
  IN _id_cliente SMALLINT
)


BEGIN 

    UPDATE direccion set 
                      direccion = _direccion, 
                      direccion2 = _direccion2, 
                      distrito = _distrito,  
                      id_ciudad = _id_ciudad, 
                      codigo_postal = _codigo_postal, 
                      telefono = _telefono 
                      WHERE id_direccion = _id_direccion;
    
    UPDATE cliente set 
                    id_almacen = _id_almacen, 
                    nombre = _nombre, 
                    apellidos = _apellidos, 
                    email = _email, 
                    id_direccion = _id_direccion, 
                    activo = _activo,
                    fecha_creacion = _fecha_creacion
                    WHERE id_cliente = _id_cliente;

END 
$$

CALL updateDireccionAndCliente('orienteee', 'orietee2', 'Xalapa ver', 601, '912300', '8888888', 1, 'Rolandos', 'Albas', 'rool@gmail.com', 1,CURRENT_TIMESTAMP, 55, 606);

/* -----------------------------------------------------------------------------------*/

CALL insertDireccionAndCliente('orienteee', '', 'Xalapa ver', 600, '91230', '2282690450', 1, 'Rolando', 'Alba', 'rool', 1, CURRENT_TIMESTAMP)

/* ---------------------------------------------------------------------------------------- */
INSERT INTO cliente (id_almacen , nombre, apellidos, email , id_direccion, activo , fecha_creacion)
VALUES (1, 'rolas', 'rolassss', 'rol@gmail.com', 47, 1, CURRENT_TIMESTAMP )

insert into direccion  (direccion, direccion2, distrito, id_ciudad, codigo_postal , telefono)
values ('Xalapa 1', '', 'Xalapa 11', 156, 11111, '3333333');
SELECT LAST_INSERT_ID();

INSERT INTO pelicula (titulo , descripcion, anyo_lanzamiento, id_idioma, duracion_alquiler, rental_rate, duracion, replacement_cost,
                      clasificacion, caracteristicas_especiales)
            VALUES ('poke', 'pelicula jajaj', 2021, 1, 5, '3.1', 120, '15.89', 'PG', 'Trailers, Commentaries');

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
--CREATE ALQUILER
DELIMITER $$
CREATE PROCEDURE insertAlquiler(
	IN _id_pelicula SMALLINT,
  IN _fecha_alquiler DATETIME,
  IN _id_cliente SMALLINT,
  IN _fecha_devolucion DATETIME,
  IN _id_empleado TINYINT
)


BEGIN 
  
    SET @idPelicula = _id_pelicula;

    SET @idInventario = (SELECT id_inventario from inventario where id_pelicula = @idPelicula limit 1);

    INSERT INTO alquiler (fecha_alquiler, id_inventario, id_cliente, fecha_devolucion, id_empleado)
    VALUES (_fecha_alquiler, @idInventario, _id_cliente, _fecha_devolucion, _id_empleado);
    
END 
$$

call insertAlquiler(999, '2021-12-20 12:42:13', 131, '2021-12-24 12:42:13', 2)

/* -------------------------------------------------------------------------- */
--UPDATE ALQUILER

DELIMITER $$
CREATE PROCEDURE updateAlquiler(
	IN _id_pelicula SMALLINT,
  IN _fecha_alquiler DATETIME,
  IN _id_cliente SMALLINT,
  IN _fecha_devolucion DATETIME,
  IN _id_empleado TINYINT
  IN _id_alquiler INT
)


BEGIN 
  
    SET @idPelicula = _id_pelicula;
    SET @idAlquiler = _id_alquiler;

    SET @idInventario = (SELECT id_inventario from inventario where id_pelicula = @idPelicula limit 1);

    UPDATE alquiler set 
          fecha_alquiler =  _fecha_alquiler, 
          id_inventario = @idInventario,
          id_cliente = _id_cliente, 
          fecha_devolucion = _fecha_devolucion,
          id_empleado = _id_empleado
          WHERE id_alquiler = @idAlquiler;
    
END 
$$

call updateAlquiler(14, '2021-12-28 12:42:13', 300, '2021-12-30 12:42:13', 1, 16052);
