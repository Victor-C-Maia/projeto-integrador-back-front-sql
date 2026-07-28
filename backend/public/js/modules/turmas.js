// ======================================================
// TURMAS
// ======================================================

let turmaEmEdicao = null;

async function carregarTurmas() {

    tituloPagina.textContent = "Turmas";

    const [turmas, disciplinas, professores] = await Promise.all([
        buscarDados("/turmas"),
        buscarDados("/disciplinas"),
        buscarDados("/professores")
    ]);

    conteudo.innerHTML = `

        <div class="card">

            ${renderizarFormularioTurma(disciplinas, professores)}

            ${renderizarTabelaTurmas(turmas)}

        </div>

    `;

    registrarEventosTurma();

}

// ======================================================
// FORMULÁRIO
// ======================================================

function renderizarFormularioTurma(disciplinas, professores) {

    return `

        <div class="cabecalho-lista">

            <h2>Cadastro de Turmas</h2>

            <button
                class="btn btn-success"
                id="btnNovaTurma">

                Nova Turma

            </button>

        </div>

        <form
            id="formularioTurma"
            class="formulario oculto">

            <h3 id="tituloFormularioTurma">

                Nova Turma

            </h3>

            <label>Código</label>

            <input
                type="text"
                id="codigoTurma"
                required>

            <label>Disciplina</label>

            <select
                id="disciplinaTurma"
                required>

                <option value="">Selecione...</option>

                ${disciplinas.map(d => `
                    <option value="${d.id}">
                        ${d.nome}
                    </option>
                `).join("")}

            </select>

            <label>Professor</label>

            <select
                id="professorTurma"
                required>

                <option value="">Selecione...</option>

                ${professores.map(p => `
                    <option value="${p.id}">
                        ${p.nome}
                    </option>
                `).join("")}

            </select>

            <label>Semestre</label>

            <input
                type="text"
                id="semestreTurma"
                placeholder="2026.1"
                required>

            <br><br>

            <button
                type="submit"
                class="btn btn-success"
                id="btnSalvarTurma">

                Salvar

            </button>

            <button
                type="button"
                class="btn btn-danger"
                id="btnCancelarTurma">

                Cancelar

            </button>

        </form>

    `;

}

// ======================================================
// TABELA
// ======================================================

function renderizarTabelaTurmas(turmas) {

    let html = `

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Código</th>
                    <th>Disciplina</th>
                    <th>Professor</th>
                    <th>Semestre</th>
                    <th>Ações</th>

                </tr>

            </thead>

            <tbody>

    `;

    turmas.forEach(turma => {

        html += `

            <tr>

                <td>${turma.id}</td>

                <td>${turma.codigo}</td>

                <td>${turma.disciplina}</td>

                <td>${turma.professor}</td>

                <td>${turma.semestre}</td>

                <td>

                    <button
                        class="btn btn-primary btn-editar"
                        data-id="${turma.id}">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-excluir"
                        data-id="${turma.id}">

                        Excluir

                    </button>

                </td>

            </tr>

        `;

    });

    html += `

            </tbody>

        </table>

    `;

    return html;

}

// ======================================================
// EVENTOS
// ======================================================

function registrarEventosTurma() {

    document
        .getElementById("btnNovaTurma")
        .addEventListener("click", mostrarFormularioTurma);

    document
        .getElementById("btnCancelarTurma")
        .addEventListener("click", esconderFormularioTurma);

    document
        .getElementById("formularioTurma")
        .addEventListener("submit", salvarTurma);
    document
        .querySelectorAll(".btn-editar")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                editarTurma(botao.dataset.id);

            });

        });

    document
        .querySelectorAll(".btn-excluir")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                excluirTurma(botao.dataset.id);

            });

        });

}

// ======================================================

function mostrarFormularioTurma() {

    turmaEmEdicao = null;

    limparFormulario("formularioTurma");

    document
        .getElementById("disciplinaTurma")
        .selectedIndex = 0;

    document
        .getElementById("professorTurma")
        .selectedIndex = 0;

    document
        .getElementById("tituloFormularioTurma")
        .textContent = "Nova Turma";

    document
        .getElementById("btnSalvarTurma")
        .textContent = "Salvar";

    mostrar("formularioTurma");

}

// ======================================================

function esconderFormularioTurma() {

    esconder("formularioTurma");

}

// ======================================================

async function salvarTurma(event) {

    event.preventDefault();

    const turma = {

        codigo:
            document.getElementById("codigoTurma").value.trim(),

        disciplina_id:
            Number(document.getElementById("disciplinaTurma").value),

        professor_id:
            Number(document.getElementById("professorTurma").value),

        semestre:
            document.getElementById("semestreTurma").value.trim()

    };

    if (
        !turma.codigo ||
        !turma.disciplina_id ||
        !turma.professor_id ||
        !turma.semestre
    ) {

        mostrarMensagem("Preencha todos os campos.");

        return;

    }

    let resposta;

    let mensagemSucesso;

    if (turmaEmEdicao === null) {

        resposta =
            await criarRegistro("/turmas", turma);

        mensagemSucesso =
            "Turma cadastrada com sucesso.";

    }
    else {

        resposta =
            await atualizarRegistro(

                "/turmas/" + turmaEmEdicao,

                turma

            );

        mensagemSucesso =
            "Turma atualizada com sucesso.";

    }

    if (resposta) {

        limparFormulario("formularioTurma");

        esconder("formularioTurma");

        turmaEmEdicao = null;

        await carregarTurmas();

        mostrarMensagem(mensagemSucesso);

    }

}

async function editarTurma(id) {

    const turma =
        await buscarDados("/turmas/" + id);

    if (!turma) {

        mostrarMensagem("Turma não encontrada.");

        return;

    }

    turmaEmEdicao = turma.id;

    document
        .getElementById("codigoTurma")
        .value = turma.codigo;

    document
        .getElementById("disciplinaTurma")
        .value = turma.disciplina_id;

    document
        .getElementById("professorTurma")
        .value = turma.professor_id;

    document
        .getElementById("semestreTurma")
        .value = turma.semestre;

    document
        .getElementById("tituloFormularioTurma")
        .textContent = "Editar Turma";

    document
        .getElementById("btnSalvarTurma")
        .textContent = "Atualizar";

    mostrar("formularioTurma");

}

async function excluirTurma(id) {

    const confirmar = confirm(

        "Deseja realmente excluir esta turma?"

    );

    if (!confirmar) {

        return;

    }

    const sucesso =
        await excluirRegistro("/turmas/" + id);

    if (sucesso) {

        await carregarTurmas();

        mostrarMensagem(
            "Turma excluída com sucesso."
        );

    }

}