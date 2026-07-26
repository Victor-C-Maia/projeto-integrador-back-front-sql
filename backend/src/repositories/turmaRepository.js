const pool = require("../database/pg");

const listarTodos = async () => {

  const resultado = await pool.query(

    `SELECT

        t.id,
        t.codigo,
        d.nome AS disciplina,
        p.nome AS professor,
        t.semestre

     FROM turmas t

     INNER JOIN disciplinas d
       ON t.disciplina_id = d.id

     INNER JOIN professores p
       ON t.professor_id = p.id

     ORDER BY t.codigo`

  );

  return resultado.rows;

};

const buscarPorId = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      codigo,
      disciplina_id,
      professor_id,
      semestre
    FROM turmas
    WHERE id=$1;
    `,
    [id]
  );

  return rows[0] || null;
};

const criar = async ({
  codigo,
  disciplina_id,
  professor_id,
  semestre,
}) => {
  const { rows } = await pool.query(
    `
    INSERT INTO turmas
      (
        codigo,
        disciplina_id,
        professor_id,
        semestre
      )
    VALUES
      ($1,$2,$3,$4)
    RETURNING
      id,
      codigo,
      disciplina_id,
      professor_id,
      semestre;
    `,
    [
      codigo,
      disciplina_id,
      professor_id,
      semestre,
    ]
  );

  return rows[0];
};

const atualizar = async (
  id,
  {
    codigo,
    disciplina_id,
    professor_id,
    semestre,
  }
) => {
  const { rows } = await pool.query(
    `
    UPDATE turmas
       SET codigo=$1,
           disciplina_id=$2,
           professor_id=$3,
           semestre=$4
     WHERE id=$5
 RETURNING
      id,
      codigo,
      disciplina_id,
      professor_id,
      semestre;
    `,
    [
      codigo,
      disciplina_id,
      professor_id,
      semestre,
      id,
    ]
  );

  return rows[0] || null;
};

const deletar = async (id) => {
  const { rows } = await pool.query(
    `
    DELETE FROM turmas
    WHERE id=$1
    RETURNING
      id,
      codigo,
      disciplina_id,
      professor_id,
      semestre;
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