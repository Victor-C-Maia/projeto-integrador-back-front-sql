-- TABELA ALUNOS

CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    data_nascimento DATE
);



-- TABELA PROFESSORES

CREATE TABLE professores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    especialidade VARCHAR(100) NOT NULL
);



-- TABELA DISCIPLINAS

CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    carga_horaria INTEGER NOT NULL
);



-- TABELA TURMAS

CREATE TABLE turmas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,

    disciplina_id INTEGER NOT NULL,
    professor_id INTEGER NOT NULL,

    semestre VARCHAR(20) NOT NULL,


    CONSTRAINT fk_turma_disciplina
        FOREIGN KEY (disciplina_id)
        REFERENCES disciplinas(id),

    CONSTRAINT fk_turma_professor
        FOREIGN KEY (professor_id)
        REFERENCES professores(id)
);



-- TABELA MATRICULAS

CREATE TABLE matriculas (
    id SERIAL PRIMARY KEY,

    aluno_id INTEGER NOT NULL,
    turma_id INTEGER NOT NULL,

    data_matricula DATE DEFAULT CURRENT_DATE,


    CONSTRAINT fk_matricula_aluno
        FOREIGN KEY (aluno_id)
        REFERENCES alunos(id),


    CONSTRAINT fk_matricula_turma
        FOREIGN KEY (turma_id)
        REFERENCES turmas(id)
);



-- TABELA NOTAS

CREATE TABLE notas (
    id SERIAL PRIMARY KEY,

    matricula_id INTEGER NOT NULL,

    nota NUMERIC(4,2),

    tipo VARCHAR(50),

    data_avaliacao DATE DEFAULT CURRENT_DATE,


    CONSTRAINT fk_nota_matricula
        FOREIGN KEY (matricula_id)
        REFERENCES matriculas(id)
);



-- VIEW BOLETIM

CREATE VIEW vw_boletim AS

SELECT

    a.id AS aluno_id,

    a.nome AS aluno_nome,


    d.nome AS disciplina_nome,


    p.nome AS professor_nome,


    t.id AS turma_id,

    t.codigo AS turma_codigo,


    n.nota,

    n.tipo,

    n.data_avaliacao,


    CASE
        WHEN n.nota >= 6.0
            THEN 'Aprovado'
        ELSE 'Reprovado'
    END AS situacao


FROM notas n


INNER JOIN matriculas m
    ON n.matricula_id = m.id


INNER JOIN alunos a
    ON m.aluno_id = a.id


INNER JOIN turmas t
    ON m.turma_id = t.id


INNER JOIN disciplinas d
    ON t.disciplina_id = d.id


INNER JOIN professores p
    ON t.professor_id = p.id;