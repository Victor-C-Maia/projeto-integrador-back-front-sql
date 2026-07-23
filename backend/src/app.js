require("dotenv").config();

const express = require("express");

const alunoRoutes = require("./routes/alunoRoutes");
const professorRoutes = require("./routes/professorRoutes");
const disciplinaRoutes = require("./routes/disciplinaRoutes");
const turmaRoutes = require("./routes/turmaRoutes");
const matriculaRoutes = require("./routes/matriculaRoutes");
const notaRoutes = require("./routes/notaRoutes");
const boletimRoutes = require("./routes/boletimRoutes");

const app = express();


// Middleware para interpretar JSON
app.use(express.json());


// Rotas da API

app.use("/alunos", alunoRoutes);

app.use("/professores", professorRoutes);

app.use("/disciplinas", disciplinaRoutes);

app.use("/turmas", turmaRoutes);

app.use("/matriculas", matriculaRoutes);

app.use("/notas", notaRoutes);

app.use("/boletim", boletimRoutes);


// Rota inicial para teste

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Sistema Escolar funcionando!"
  });
});


module.exports = app;