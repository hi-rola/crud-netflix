const express = require("express");
const cors = require("cors");
const app = express();

// configuracion
app.set("port", 3000);

//middlewares : se ejecuta antes de llegar a las rutas
app.use(express.json());
app.use(cors());

// permite procesar datos enviados desde formularios
app.use(
  express.urlencoded({
    extended: false,
  })
);

//rutas
app.use("/api", require("./routes/cliente.route"));
app.use("/api", require("./routes/pelicula.route"));
app.use("/api", require("./routes/consultas.route"));
app.use("/api", require("./routes/inventario.route"));
app.use("/api", require("./routes/alquiler.route"));

app.listen(app.get("port"), () => {
  console.log("Servidor iniciado");
  // current timestamp in milliseconds
  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  let fechaActual = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  console.log(fechaActual);
});
