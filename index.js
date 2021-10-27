const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let personas = [
  {
    nombre: "Carlos",
    apellidos: "Heredia",
    edad: 30,
  },
  {
    nombre: "Sílvia",
    apellidos: "Suan",
    edad: 32,
  },
  {
    nombre: "Dídac",
    apellidos: "Suan",
    edad: 2,
  },
  {
    nombre: "Nil",
    apellidos: "Suan",
    edad: 0,
  },
  {
    nombre: "Olivia",
    apellidos: "Suan",
    edad: 3,
  },
];

app.get("/personas", (req, res) => {
  res.send(personas);
});

app.post("/personas", (req, res) => {
  let persona = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    edad: req.body.edad,
  };
  personas.push(persona);
  res.send(personas);
});

app.put("/personas", (req, res) => {
  let nombre = req.body.nombre;
  let apellidos = req.body.apellidos;
  let edad = req.body.edad;
  for (let i = 0; i < personas.length; i++) {
    if (nombre === personas[i].nombre) {
      personas[i].apellidos = apellidos;
      personas[i].edad = edad;
    }
  }
  res.send({ mensaje: "Se ha editado todo correctamente" });
});

app.delete("/personas", function (req, res) {
  let nombre = req.body.nombre;
  let borrarNombre = false;
  for (let i = 0; i < personas.length; i++) {
    if (nombre === personas[i].nombre) {
      personas.splice(i, 1);
      borrarNombre = true;
    }
  }
  borrarNombre
    ? res.send(personas)
    : res.send({
        mensaje: "La persona con ese nombre no se pudo borrar",
      });
});

app.listen(process.env.PORT || 3000);
