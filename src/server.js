import express from "express";
import handlebars from "express-handlebars";
import { Server as HttpServer } from "http";
import { Server as IOServer } from"socket.io";
import MensajeModel from './models/Mensaje.js';
import ProductoModel from './models/Producto.js';
import {options} from './config/db.js';
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;
const mensajeModel = new MensajeModel('mensajes',options.sqlite);
const productoModel = new ProductoModel('productos',options.mariadb);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: "./src/views/layouts",
    partialsDir: "./src/views/partials",
  })
);

app.set("views", "./src/views");
app.set("view engine", "hbs");

//evento para cuando un cliente se contecta
io.on("connection", async (socket) => {
  console.log("usuario conectado");
  socket.emit("connectionMessage", "Conexión socket establecida con éxito");
  
  const msjs = await mensajeModel.getMensajes();
  const prds = await productoModel.getProductos();
  socket.emit("messageBack", msjs);
  socket.emit("productosBack",prds);

  //evento para capturar una desconexion
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  socket.on("nuevoProducto", async (data) => {
    const producto = {
      name: data.name,
      price: data.price,
      thumbnail: data.photo,
    };
    await productoModel.agregarProducto(producto);
    const prds = await productoModel.getProductos();
    io.sockets.emit("productosBack",prds);
  });

  socket.on("messageFront", async (data) => {
    await mensajeModel.cargarMensaje(data);
    const msjs = await mensajeModel.getMensajes();
    io.sockets.emit("messageBack", msjs);
  });
});

app.get("/", (req, res) => {
  res.render("main", {
    solapaNombre: "Websockets - Franco Benitez",
  });
});

httpServer.listen(PORT, () => console.log("server on port 8080"));
