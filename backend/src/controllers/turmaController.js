const repository = require("../repositories/turmaRepository");

const listar = async (req, res) => {
  try {
    const turmas = await repository.listarTodos();
    res.json(turmas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao listar turmas.",
    });
  }
};

const obterPorId = async (req, res) => {
  try {
    const turma = await repository.buscarPorId(req.params.id);

    if (!turma) {
      return res.status(404).json({
        erro: "Turma não encontrada.",
      });
    }

    res.json(turma);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao buscar turma.",
    });
  }
};

const criar = async (req, res) => {
  try {
    const {
      codigo,
      disciplina_id,
      professor_id,
      semestre,
    } = req.body;

    if (
      !codigo ||
      !disciplina_id ||
      !professor_id ||
      !semestre
    ) {
      return res.status(400).json({
        erro: "Código, disciplina, professor e semestre são obrigatórios.",
      });
    }

    const turma = await repository.criar({
      codigo,
      disciplina_id,
      professor_id,
      semestre,
    });

    res.status(201).json(turma);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao criar turma.",
    });
  }
};

const atualizar = async (req, res) => {
  try {
    const {
      codigo,
      disciplina_id,
      professor_id,
      semestre,
    } = req.body;

    if (
      !codigo ||
      !disciplina_id ||
      !professor_id ||
      !semestre
    ) {
      return res.status(400).json({
        erro: "Código, disciplina, professor e semestre são obrigatórios.",
      });
    }

    const turma = await repository.atualizar(
      req.params.id,
      {
        codigo,
        disciplina_id,
        professor_id,
        semestre,
      }
    );

    if (!turma) {
      return res.status(404).json({
        erro: "Turma não encontrada.",
      });
    }

    res.json(turma);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao atualizar turma.",
    });
  }
};

const deletar = async (req, res) => {
  try {
    const turma = await repository.deletar(req.params.id);

    if (!turma) {
      return res.status(404).json({
        erro: "Turma não encontrada.",
      });
    }

    res.json({
      mensagem: "Turma removida com sucesso.",
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao remover turma.",
    });
  }
};

module.exports = {
  listar,
  obterPorId,
  criar,
  atualizar,
  deletar,
};