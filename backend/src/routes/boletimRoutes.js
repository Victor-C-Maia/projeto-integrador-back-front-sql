const express = require("express");
const controller = require("../controllers/boletimController");

const router = express.Router();

router.get(
  "/aluno/:alunoId",
  controller.boletim
);

router.get(
  "/aluno/:alunoId/media",
  controller.media
);

router.get(
  "/turma/:turmaId",
  controller.boletimTurma
);

module.exports = router;