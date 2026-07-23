const repository = require("../repositories/professorRepository");

const listar = async (req, res) => {
  try {
    const professores = await repository.listarTodos();
    res.json(professores);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao listar professores." });
  }
};

const obterPorId = async (req, res) => {
  try {
    const professor = await repository.buscarPorId(req.params.id);

    if (!professor) {
      return res.status(404).json({
        erro: "Professor não encontrado.",
      });
    }

    res.json(professor);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar professor." });
  }
};

const criar = async (req, res) => {
  try {
    const { nome, email, especialidade } = req.body;

    if (!nome || !email || !especialidade) {
      return res.status(400).json({
        erro: "Nome, email e especialidade são obrigatórios.",
      });
    }

    const professor = await repository.criar({
      nome,
      email,
      especialidade,
    });

    res.status(201).json(professor);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao criar professor." });
  }
};

const atualizar = async (req, res) => {
  try {
    const { nome, email, especialidade } = req.body;

    if (!nome || !email || !especialidade) {
      return res.status(400).json({
        erro: "Nome, email e especialidade são obrigatórios.",
      });
    }

    const professor = await repository.atualizar(
      req.params.id,
      { nome, email, especialidade }
    );

    if (!professor) {
      return res.status(404).json({
        erro: "Professor não encontrado.",
      });
    }

    res.json(professor);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar professor." });
  }
};

const deletar = async (req, res) => {
  try {
    const professor = await repository.deletar(req.params.id);

    if (!professor) {
      return res.status(404).json({
        erro: "Professor não encontrado.",
      });
    }

    res.json({
      mensagem: "Professor removido com sucesso.",
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao remover professor." });
  }
};

module.exports = {
  listar,
  obterPorId,
  criar,
  atualizar,
  deletar,
};