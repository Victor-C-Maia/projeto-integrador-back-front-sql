const pool = require("../database/pg");

const boletimDoAluno = async (alunoId) => {
  const { rows } = await pool.query(
    `
    SELECT
      aluno_id,
      aluno_nome,
      disciplina_nome,
      professor_nome,
      turma_id,
      turma_codigo,
      nota,
      tipo,
      data_avaliacao,
      situacao
    FROM vw_boletim
    WHERE aluno_id = $1
    ORDER BY disciplina_nome, data_avaliacao;
    `,
    [alunoId]
  );

  return rows;
};

const boletimDaTurma = async (turmaId) => {
  const { rows } = await pool.query(
    `
    SELECT
      aluno_id,
      aluno_nome,
      disciplina_nome,
      professor_nome,
      turma_id,
      turma_codigo,
      nota,
      tipo,
      data_avaliacao,
      situacao
    FROM vw_boletim
    WHERE turma_id = $1
    ORDER BY aluno_nome, disciplina_nome, data_avaliacao;
    `,
    [turmaId]
  );

  return rows;
};

const mediaPorDisciplina = async (alunoId) => {
  const { rows } = await pool.query(
    `
    SELECT
      disciplina_nome,
      ROUND(AVG(nota), 2) AS media,
      COUNT(*) AS total_avaliacoes
    FROM vw_boletim
    WHERE aluno_id = $1
      AND nota IS NOT NULL
    GROUP BY disciplina_nome
    ORDER BY disciplina_nome;
    `,
    [alunoId]
  );

  return rows;
};

module.exports = {
  boletimDoAluno,
  boletimDaTurma,
  mediaPorDisciplina,
};