const pool = require("../database/pg");

const listarTodos = async () => {
  const { rows } = await pool.query(`
    SELECT
      id,
      matricula_id,
      nota,
      tipo,
      data_avaliacao
    FROM notas
    ORDER BY data_avaliacao DESC, id;
  `);

  return rows;
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