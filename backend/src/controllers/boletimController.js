const repository = require("../repositories/boletimRepository");

const boletim = async (req, res) => {
  try {
    const boletim = await repository.boletimDoAluno(
      req.params.alunoId
    );

    if (boletim.length === 0) {
      return res.status(404).json({
        erro: "Nenhum boletim encontrado para este aluno.",
      });
    }

    res.json(boletim);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao buscar boletim.",
    });
  }
};

const media = async (req, res) => {
  try {
    const medias =
      await repository.mediaPorDisciplina(
        req.params.alunoId
      );

    res.json(medias);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao calcular médias.",
    });
  }
};

const boletimTurma = async (req, res) => {
  try {
    const boletim =
      await repository.boletimDaTurma(
        req.params.turmaId
      );

    res.json(boletim);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao buscar boletim da turma.",
    });
  }
};

module.exports = {
  boletim,
  media,
  boletimTurma,
};