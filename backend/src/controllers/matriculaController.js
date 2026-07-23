const repository = require("../repositories/matriculaRepository");

const listar = async (req, res) => {
  try {
    const matriculas = await repository.listarTodos();
    res.json(matriculas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao listar matrículas.",
    });
  }
};

const obterPorId = async (req, res) => {
  try {
    const matricula = await repository.buscarPorId(req.params.id);

    if (!matricula) {
      return res.status(404).json({
        erro: "Matrícula não encontrada.",
      });
    }

    res.json(matricula);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao buscar matrícula.",
    });
  }
};

const criar = async (req, res) => {
  try {
    const { aluno_id, turma_id } = req.body;

    if (!aluno_id || !turma_id) {
      return res.status(400).json({
        erro: "Aluno e turma são obrigatórios.",
      });
    }

    const matricula = await repository.criar({
      aluno_id,
      turma_id,
    });

    res.status(201).json(matricula);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao criar matrícula.",
    });
  }
};

const atualizar = async (req, res) => {
  try {
    const { aluno_id, turma_id } = req.body;

    if (!aluno_id || !turma_id) {
      return res.status(400).json({
        erro: "Aluno e turma são obrigatórios.",
      });
    }

    const matricula = await repository.atualizar(
      req.params.id,
      {
        aluno_id,
        turma_id,
      }
    );

    if (!matricula) {
      return res.status(404).json({
        erro: "Matrícula não encontrada.",
      });
    }

    res.json(matricula);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao atualizar matrícula.",
    });
  }
};

const deletar = async (req, res) => {
  try {
    const matricula = await repository.deletar(req.params.id);

    if (!matricula) {
      return res.status(404).json({
        erro: "Matrícula não encontrada.",
      });
    }

    res.json({
      mensagem: "Matrícula removida com sucesso.",
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao remover matrícula.",
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