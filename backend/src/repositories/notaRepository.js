const pool = require("../database/pg");

const listarTodos = async () => {

  const resultado = await pool.query(

    `SELECT

        n.id,
        a.nome AS aluno,
        t.codigo AS turma,
        n.nota,
        n.tipo,
        n.data_avaliacao

     FROM notas n

     INNER JOIN matriculas m
       ON n.matricula_id = m.id

     INNER JOIN alunos a
       ON m.aluno_id = a.id

     INNER JOIN turmas t
       ON m.turma_id = t.id

     ORDER BY a.nome, t.codigo, n.data_avaliacao`

  );

  return resultado.rows;

};

const buscarPorId = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      matricula_id,
      nota,
      tipo,
      data_avaliacao
    FROM notas
    WHERE id = $1;
    `,
    [id]
  );

  return rows[0] || null;
};

const criar = async ({
  matricula_id,
  nota,
  tipo,
  data_avaliacao,
}) => {
  const { rows } = await pool.query(
    `
    INSERT INTO notas
      (
        matricula_id,
        nota,
        tipo,
        data_avaliacao
      )
    VALUES
      ($1, $2, $3, $4)
    RETURNING
      id,
      matricula_id,
      nota,
      tipo,
      data_avaliacao;
    `,
    [
      matricula_id,
      nota,
      tipo,
      data_avaliacao,
    ]
  );

  return rows[0];
};

const atualizar = async (
  id,
  {
    matricula_id,
    nota,
    tipo,
    data_avaliacao,
  }
) => {
  const { rows } = await pool.query(
    `
    UPDATE notas
       SET matricula_id = $1,
           nota = $2,
           tipo = $3,
           data_avaliacao = $4
     WHERE id = $5
 RETURNING
      id,
      matricula_id,
      nota,
      tipo,
      data_avaliacao;
    `,
    [
      matricula_id,
      nota,
      tipo,
      data_avaliacao,
      id,
    ]
  );

  return rows[0] || null;
};

const deletar = async (id) => {
  const { rows } = await pool.query(
    `
    DELETE FROM notas
    WHERE id = $1
    RETURNING
      id,
      matricula_id,
      nota,
      tipo,
      data_avaliacao;
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