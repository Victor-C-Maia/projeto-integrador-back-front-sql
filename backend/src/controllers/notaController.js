const repository = require("../repositories/notaRepository");

const listar = async (req, res) => {
  try {
    const notas = await repository.listarTodos();
    res.json(notas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao listar notas.",
    });
  }
};

const obterPorId = async (req, res) => {
  try {
    const nota = await repository.buscarPorId(req.params.id);

    if (!nota) {
      return res.status(404).json({
        erro: "Nota não encontrada.",
      });
    }

    res.json(nota);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao buscar nota.",
    });
  }
};

const criar = async (req, res) => {
  try {
    const {
      matricula_id,
      nota,
      tipo,
      data_avaliacao,
    } = req.body;

    if (
      matricula_id === undefined ||
      nota === undefined
    ) {
      return res.status(400).json({
        erro: "Matrícula e nota são obrigatórias.",
      });
    }

    const novaNota = await repository.criar({
      matricula_id,
      nota,
      tipo,
      data_avaliacao,
    });

    res.status(201).json(novaNota);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao criar nota.",
    });
  }
};

const atualizar = async (req, res) => {
  try {
    const {
      matricula_id,
      nota,
      tipo,
      data_avaliacao,
    } = req.body;

    if (
      matricula_id === undefined ||
      nota === undefined
    ) {
      return res.status(400).json({
        erro: "Matrícula e nota são obrigatórias.",
      });
    }

    const notaAtualizada = await repository.atualizar(
      req.params.id,
      {
        matricula_id,
        nota,
        tipo,
        data_avaliacao,
      }
    );

    if (!notaAtualizada) {
      return res.status(404).json({
        erro: "Nota não encontrada.",
      });
    }

    res.json(notaAtualizada);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao atualizar nota.",
    });
  }
};

const deletar = async (req, res) => {
  try {
    const nota = await repository.deletar(req.params.id);

    if (!nota) {
      return res.status(404).json({
        erro: "Nota não encontrada.",
      });
    }

    res.json({
      mensagem: "Nota removida com sucesso.",
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao remover nota.",
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