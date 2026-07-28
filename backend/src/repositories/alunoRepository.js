const pool = require("../database/pg");

const listarTodos = async () => {
  const { rows } = await pool.query(`
    SELECT
      id,
      nome,
      email,
      matricula,
      data_nascimento
    FROM alunos
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
      email,
      matricula,
      data_nascimento
    FROM alunos
    WHERE id = $1;
    `,
    [id]
  );

  return rows[0] || null;
};

const criar = async ({ nome, email, matricula, data_nascimento }) => {
  const { rows } = await pool.query(
    `
    INSERT INTO alunos
      (nome, email, matricula, data_nascimento)
    VALUES
      ($1, $2, $3, $4)
    RETURNING
      id,
      nome,
      email,
      matricula,
      data_nascimento;
    `,
    [nome, email, matricula, data_nascimento]
  );

  return rows[0];
};

const atualizar = async (
  id,
  { nome, email, matricula, data_nascimento }
) => {
  const { rows } = await pool.query(
    `
    UPDATE alunos
       SET nome = $1,
           email = $2,
           matricula = $3,
           data_nascimento = $4
     WHERE id = $5
 RETURNING
           id,
           nome,
           email,
           matricula,
           data_nascimento;
    `,
    [nome, email, matricula, data_nascimento, id]
  );

  return rows[0] || null;
};

const deletar = async (id) => {
  const { rows } = await pool.query(
    `
    DELETE FROM alunos
    WHERE id = $1
    RETURNING
      id,
      nome,
      email,
      matricula,
      data_nascimento;
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