const pool = require("../database/pg");

const listarTodos = async () => {

  const resultado = await pool.query(

    `SELECT

        m.id,
        a.nome AS aluno,
        t.codigo AS turma,
        m.data_matricula

     FROM matriculas m

     INNER JOIN alunos a
       ON m.aluno_id = a.id

     INNER JOIN turmas t
       ON m.turma_id = t.id

     ORDER BY a.nome, t.codigo`

  );

  return resultado.rows;

};

const buscarPorId = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      aluno_id,
      turma_id,
      data_matricula
    FROM matriculas
    WHERE id = $1;
    `,
    [id]
  );

  return rows[0] || null;
};

const criar = async ({ aluno_id, turma_id }) => {
  const { rows } = await pool.query(
    `
    INSERT INTO matriculas
      (aluno_id, turma_id)
    VALUES
      ($1, $2)
    RETURNING
      id,
      aluno_id,
      turma_id,
      data_matricula;
    `,
    [aluno_id, turma_id]
  );

  return rows[0];
};

const atualizar = async (id, { aluno_id, turma_id }) => {
  const { rows } = await pool.query(
    `
    UPDATE matriculas
       SET aluno_id = $1,
           turma_id = $2
     WHERE id = $3
 RETURNING
      id,
      aluno_id,
      turma_id,
      data_matricula;
    `,
    [aluno_id, turma_id, id]
  );

  return rows[0] || null;
};

const deletar = async (id) => {
  const { rows } = await pool.query(
    `
    DELETE FROM matriculas
    WHERE id = $1
    RETURNING
      id,
      aluno_id,
      turma_id,
      data_matricula;
    `,
    [id]
  );

  return rows[0] || null;
};

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};