const pool = require("../database/pg");

const listarTodos = async () => {
  const { rows } = await pool.query(`
    SELECT
      id,
      nome,
      carga_horaria
    FROM disciplinas
    ORDER BY id;
  `);

  return rows;
};

const buscarPorId = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      nome,
      carga_horaria
    FROM disciplinas
    WHERE id=$1;
    `,
    [id]
  );

  return rows[0] || null;
};

const criar = async ({ nome, carga_horaria }) => {
  const { rows } = await pool.query(
    `
    INSERT INTO disciplinas
      (nome,carga_horaria)
    VALUES
      ($1,$2)
    RETURNING
      id,
      nome,
      carga_horaria;
    `,
    [nome, carga_horaria]
  );

  return rows[0];
};

const atualizar = async (
  id,
  { nome, carga_horaria }
) => {
  const { rows } = await pool.query(
    `
    UPDATE disciplinas
       SET nome=$1,
           carga_horaria=$2
     WHERE id=$3
 RETURNING
      id,
      nome,
      carga_horaria;
    `,
    [nome, carga_horaria, id]
  );

  return rows[0] || null;
};

const deletar = async (id) => {
  const { rows } = await pool.query(
    `
    DELETE FROM disciplinas
    WHERE id=$1
    RETURNING
      id,
      nome,
      carga_horaria;
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