// ======================================================
// DISCIPLINAS
// ======================================================

let disciplinaEmEdicao = null;

async function carregarDisciplinas() {

    tituloPagina.textContent = "Disciplinas";

    const disciplinas = await buscarDados("/disciplinas");

    conteudo.innerHTML = `

        <div class="card">

            ${renderizarFormularioDisciplina()}

            ${renderizarTabelaDisciplinas(disciplinas)}

        </div>

    `;

    registrarEventosDisciplina();

}

// ======================================================
// FORMULÁRIO
// ======================================================

function renderizarFormularioDisciplina() {

    return `

        <div class="cabecalho-lista">

            <h2>Cadastro de Disciplinas</h2>

            <button
                class="btn btn-success"
                id="btnNovaDisciplina">

                Nova Disciplina

            </button>

        </div>

        <form
            id="formularioDisciplina"
            class="formulario oculto">

            <h3 id="tituloFormularioDisciplina">

                Nova Disciplina

            </h3>

            <label>Nome</label>

            <input
                type="text"
                id="nomeDisciplina"
                required>

            <label>Carga Horária</label>

            <input
                type="number"
                id="cargaHorariaDisciplina"
                min="1"
                required>

            <br><br>

            <button
                type="submit"
                class="btn btn-success"
                id="btnSalvarDisciplina">

                Salvar

            </button>

            <button
                type="button"
                class="btn btn-danger"
                id="btnCancelarDisciplina">

                Cancelar

            </button>

        </form>

    `;

}

// ======================================================
// TABELA
// ======================================================

function renderizarTabelaDisciplinas(disciplinas) {

    let html = `

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Nome</th>
                    <th>Carga Horária</th>
                    <th>Ações</th>

                </tr>

            </thead>

            <tbody>

    `;

    disciplinas.forEach(disciplina => {

        html += `

            <tr>

                <td>${disciplina.id}</td>

                <td>${disciplina.nome}</td>

                <td>${disciplina.carga_horaria}</td>

                <td>

                    <button
                        class="btn btn-primary btn-editar"
                        data-id="${disciplina.id}">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-excluir"
                        data-id="${disciplina.id}">

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

function registrarEventosDisciplina() {

    document
        .getElementById("btnNovaDisciplina")
        .addEventListener("click", mostrarFormularioDisciplina);

    document
        .getElementById("btnCancelarDisciplina")
        .addEventListener("click", esconderFormularioDisciplina);

    document
        .getElementById("formularioDisciplina")
        .addEventListener("submit", salvarDisciplina);

    document
        .querySelectorAll(".btn-editar")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                editarDisciplina(botao.dataset.id);

            });

        });

    document
        .querySelectorAll(".btn-excluir")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                excluirDisciplina(botao.dataset.id);

            });

        });    

}

// ======================================================

function mostrarFormularioDisciplina() {

    disciplinaEmEdicao = null;

    limparFormulario("formularioDisciplina");

    document
        .getElementById("tituloFormularioDisciplina")
        .textContent = "Nova Disciplina";

    document
        .getElementById("btnSalvarDisciplina")
        .textContent = "Salvar";

    mostrar("formularioDisciplina");

}

// ======================================================

function esconderFormularioDisciplina() {

    esconder("formularioDisciplina");

}

// ======================================================

async function salvarDisciplina(event) {

    event.preventDefault();

    const disciplina = {

        nome:
            document
                .getElementById("nomeDisciplina")
                .value
                .trim(),

        carga_horaria: Number(

            document
                .getElementById("cargaHorariaDisciplina")
                .value

        )

    };

    if (

        !disciplina.nome ||

        !disciplina.carga_horaria

    ) {

        mostrarMensagem("Preencha todos os campos.");

        return;

    }

    let resposta;

    let mensagemSucesso;

    if (disciplinaEmEdicao === null) {

        resposta =
            await criarRegistro("/disciplinas", disciplina);

        mensagemSucesso =
            "Disciplina cadastrada com sucesso.";

    }
    else {

        resposta =
            await atualizarRegistro(

                "/disciplinas/" + disciplinaEmEdicao,

                disciplina

            );

        mensagemSucesso =
            "Disciplina atualizada com sucesso.";

    }

    if (resposta) {

        limparFormulario("formularioDisciplina");

        esconder("formularioDisciplina");

        disciplinaEmEdicao = null;

        await carregarDisciplinas();

        mostrarMensagem(mensagemSucesso);

    }

}

async function editarDisciplina(id) {

    const disciplina =
        await buscarDados("/disciplinas/" + id);

    if (!disciplina) {

        mostrarMensagem("Disciplina não encontrada.");

        return;

    }

    disciplinaEmEdicao = disciplina.id;

    document
        .getElementById("nomeDisciplina")
        .value = disciplina.nome;

    document
        .getElementById("cargaHorariaDisciplina")
        .value = disciplina.carga_horaria;

    document
        .getElementById("tituloFormularioDisciplina")
        .textContent = "Editar Disciplina";

    document
        .getElementById("btnSalvarDisciplina")
        .textContent = "Atualizar";

    mostrar("formularioDisciplina");

}

async function excluirDisciplina(id) {

    const confirmar = confirm(

        "Deseja realmente excluir esta disciplina?"

    );

    if (!confirmar) {

        return;

    }

    const sucesso =
        await excluirRegistro("/disciplinas/" + id);

    if (sucesso) {

        await carregarDisciplinas();

        mostrarMensagem(

            "Disciplina excluída com sucesso."

        );

    }

}