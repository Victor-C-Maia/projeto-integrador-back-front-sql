const repository = require("../repositories/disciplinaRepository");

const listar = async (req, res) => {
  try {
    const disciplinas = await repository.listarTodos();
    res.json(disciplinas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao listar disciplinas.",
    });
  }
};

const obterPorId = async (req, res) => {
  try {
    const disciplina = await repository.buscarPorId(req.params.id);

    if (!disciplina) {
      return res.status(404).json({
        erro: "Disciplina não encontrada.",
      });
    }

    res.json(disciplina);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao buscar disciplina.",
    });
  }
};

const criar = async (req, res) => {
  try {
    const { nome, carga_horaria } = req.body;

    if (!nome || !carga_horaria) {
      return res.status(400).json({
        erro: "Nome e carga horária são obrigatórios.",
      });
    }

    const disciplina = await repository.criar({
      nome,
      carga_horaria,
    });

    res.status(201).json(disciplina);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao criar disciplina.",
    });
  }
};

const atualizar = async (req, res) => {
  try {
    const { nome, carga_horaria } = req.body;

    if (!nome || !carga_horaria) {
      return res.status(400).json({
        erro: "Nome e carga horária são obrigatórios.",
      });
    }

    const disciplina = await repository.atualizar(
      req.params.id,
      {
        nome,
        carga_horaria,
      }
    );

    if (!disciplina) {
      return res.status(404).json({
        erro: "Disciplina não encontrada.",
      });
    }

    res.json(disciplina);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao atualizar disciplina.",
    });
  }
};

const deletar = async (req, res) => {
  try {
    const disciplina = await repository.deletar(req.params.id);

    if (!disciplina) {
      return res.status(404).json({
        erro: "Disciplina não encontrada.",
      });
    }

    res.json({
      mensagem: "Disciplina removida com sucesso.",
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao remover disciplina.",
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