const express = require("express");
const app = express();

// configuracion
app.set("port", 3000);

//middleware
app.use(express.json());

//rutas
app.use("/api", require("./routes/cliente.route"));

app.listen(app.get("port"), () => {
  console.log("server inicio");
});