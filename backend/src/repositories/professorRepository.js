const pool = require("../database/pg");

const listarTodos = async () => {
  const { rows } = await pool.query(`
    SELECT
      id,
      nome,
      email,
      especialidade
    FROM professores
    ORDER BY nome;
  `);

  return rows;
};

const buscarPorId = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      nome,
      email,
      especialidade
    FROM professores
    WHERE id = $1;
    `,
    [id]
  );

  return rows[0] || null;
};

const criar = async ({ nome, email, especialidade }) => {
  const { rows } = await pool.query(
    `
    INSERT INTO professores
      (nome, email, especialidade)
    VALUES
      ($1,$2,$3)
    RETURNING
      id,
      nome,
      email,
      especialidade;
    `,
    [nome, email, especialidade]
  );

  return rows[0];
};

const atualizar = async (
  id,
  { nome, email, especialidade }
) => {
  const { rows } = await pool.query(
    `
    UPDATE professores
       SET nome=$1,
           email=$2,
           especialidade=$3
     WHERE id=$4
 RETURNING
      id,
      nome,
      email,
      especialidade;
    `,
    [nome, email, especialidade, id]
  );

  return rows[0] || null;
};

const deletar = async (id) => {
  const { rows } = await pool.query(
    `
    DELETE FROM professores
    WHERE id=$1
    RETURNING
      id,
      nome,
      email,
      especialidade;
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