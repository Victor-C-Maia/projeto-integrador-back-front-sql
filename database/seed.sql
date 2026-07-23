
-- .....SISTEMA ESCOLAR.....
-- .....(dados iniciais).....

-- ALUNOS

INSERT INTO alunos
(nome, email, matricula, data_nascimento)
VALUES

('Ana Silva',
 'ana@email.com',
 'MAT001',
 '2005-03-15'),


('Bruno Santos',
 'bruno@email.com',
 'MAT002',
 '2004-07-22'),


('Carla Oliveira',
 'carla@email.com',
 'MAT003',
 '2005-01-10');



-- PROFESSORES

INSERT INTO professores
(nome, email, especialidade)
VALUES

('Prof. Carlos',
 'carlos@email.com',
 'Matemática'),


('Profa. Mariana',
 'mariana@email.com',
 'Português');



-- DISCIPLINAS

INSERT INTO disciplinas
(nome, carga_horaria)
VALUES

('Matemática',80),

('Português',80),

('História',60);



-- TURMAS

INSERT INTO turmas
(codigo, disciplina_id, professor_id, semestre)
VALUES

('MAT2024-1',1,1,'2024.1'),

('POR2024-1',2,2,'2024.1'),

('HIS2024-1',3,1,'2024.1');



-- MATRÍCULAS

INSERT INTO matriculas
(aluno_id,turma_id)
VALUES

(1,1),
(1,2),

(2,1),
(2,3),

(3,2),
(3,3);



-- NOTAS

INSERT INTO notas
(matricula_id,nota,tipo)
VALUES

(1,8.5,'prova'),
(1,9.0,'trabalho'),

(2,7.0,'prova'),
(2,8.0,'trabalho'),

(3,6.5,'prova'),
(3,7.0,'trabalho'),

(4,9.5,'prova'),
(4,10.0,'trabalho'),

(5,5.0,'prova'),
(5,6.0,'trabalho'),

(6,8.0,'prova'),
(6,8.5,'trabalho');