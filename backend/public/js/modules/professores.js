// ======================================================
// PROFESSORES
// ======================================================
let professorEmEdicao = null;

async function carregarProfessores() {

    tituloPagina.textContent = "Professores";

    const professores = await buscarDados("/professores");

    conteudo.innerHTML = `

        <div class="card">

            ${renderizarFormularioProfessor()}

            ${renderizarTabelaProfessores(professores)}

        </div>

    `;

    registrarEventosProfessor();

}

// ======================================================
// FORMULÁRIO
// ======================================================

function renderizarFormularioProfessor() {

    return `

        <div class="cabecalho-lista">

            <h2>Cadastro de Professores</h2>

            <button
                class="btn btn-success"
                id="btnNovoProfessor">

                Novo Professor

            </button>

        </div>

        <form
            id="formularioProfessor"
            class="formulario oculto">

            <h3 id="tituloFormularioProfessor">
                Novo Professor
            </h3>

            <label>Nome</label>

            <input
                type="text"
                id="nomeProfessor"
                required>

            <label>Email</label>

            <input
                type="email"
                id="emailProfessor"
                required>

            <label>Especialidade</label>

            <input
                type="text"
                id="especialidadeProfessor"
                required>

            <br><br>

            <button
                type="submit"
                class="btn btn-success"
                id="btnSalvarProfessor">

                Salvar

            </button>

            <button
                type="button"
                class="btn btn-danger"
                id="btnCancelarProfessor">

                Cancelar

            </button>

        </form>

    `;

}

// ======================================================
// TABELA
// ======================================================

function renderizarTabelaProfessores(professores) {

    let html = `

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Especialidade</th>
                    <th>Ações</th>

                </tr>

            </thead>

            <tbody>

    `;

    professores.forEach(professor => {

        html += `

            <tr>

                <td>${professor.id}</td>

                <td>${professor.nome}</td>

                <td>${professor.email}</td>

                <td>${professor.especialidade}</td>

                <td>

                    <button
                        class="btn btn-primary btn-editar"
                        data-id="${professor.id}">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-excluir"
                        data-id="${professor.id}">

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

function registrarEventosProfessor() {

    document
        .getElementById("btnNovoProfessor")
        .addEventListener("click", mostrarFormularioProfessor);

    document
        .getElementById("btnCancelarProfessor")
        .addEventListener("click", esconderFormularioProfessor);

    document
        .getElementById("formularioProfessor")
        .addEventListener("submit", salvarProfessor);

    document
        .querySelectorAll(".btn-editar")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                editarProfessor(botao.dataset.id);

            });

        });

    document
        .querySelectorAll(".btn-excluir")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                excluirProfessor(botao.dataset.id);

            });

        });

}

// ======================================================

function mostrarFormularioProfessor() {

    professorEmEdicao = null;

    limparFormulario("formularioProfessor");

    document
        .getElementById("tituloFormularioProfessor")
        .textContent = "Novo Professor";

    document
        .getElementById("btnSalvarProfessor")
        .textContent = "Salvar";

    mostrar("formularioProfessor");

}

// ======================================================

function esconderFormularioProfessor() {

    esconder("formularioProfessor");

}

// ======================================================

async function salvarProfessor(event) {

    event.preventDefault();

    const professor = {

        nome:
            document
                .getElementById("nomeProfessor")
                .value
                .trim(),

        email:
            document
                .getElementById("emailProfessor")
                .value
                .trim(),

        especialidade:
            document
                .getElementById("especialidadeProfessor")
                .value
                .trim()

    };

    if (
        !professor.nome ||
        !professor.email ||
        !professor.especialidade
    ) {

        mostrarMensagem("Preencha todos os campos.");

        return;
    }

    let resposta;
    let mensagemSucesso;

    if (professorEmEdicao === null) {

        resposta =
            await criarRegistro("/professores", professor);

        mensagemSucesso =
            "Professor cadastrado com sucesso.";

    }
    else {

        resposta =
            await atualizarRegistro(
                "/professores/" + professorEmEdicao,
                professor
            );

        mensagemSucesso =
            "Professor atualizado com sucesso.";
    }

    if (resposta) {

        limparFormulario("formularioProfessor");

        esconder("formularioProfessor");

        professorEmEdicao = null;

        await carregarProfessores();

        mostrarMensagem(mensagemSucesso);
    }
}

// async function salvarProfessor(event) {

//     event.preventDefault();

//     const professor = {

//         nome:
//             document
//                 .getElementById("nomeProfessor")
//                 .value
//                 .trim(),

//         email:
//             document
//                 .getElementById("emailProfessor")
//                 .value
//                 .trim(),

//         especialidade:
//             document
//                 .getElementById("especialidadeProfessor")
//                 .value
//                 .trim()

//     };

//     if (

//         !professor.nome ||

//         !professor.email ||

//         !professor.especialidade

//     ) {

//         mostrarMensagem("Preencha todos os campos.");

//         return;

//     }

//     const resposta =
//         await criarRegistro("/professores", professor);

//     if (resposta) {

//         limparFormulario("formularioProfessor");

//         esconder("formularioProfessor");

//         await carregarProfessores();

//         mostrarMensagem("Professor cadastrado com sucesso.");

//     }

// }

// ======================================================

async function editarProfessor(id) {

    const professor =
        await buscarDados("/professores/" + id);

    if (!professor) {

        mostrarMensagem("Professor não encontrado.");

        return;
    }

    professorEmEdicao = professor.id;

    document
        .getElementById("nomeProfessor")
        .value = professor.nome;

    document
        .getElementById("emailProfessor")
        .value = professor.email;

    document
        .getElementById("especialidadeProfessor")
        .value = professor.especialidade;

    document
        .getElementById("tituloFormularioProfessor")
        .textContent = "Editar Professor";

    document
        .getElementById("btnSalvarProfessor")
        .textContent = "Atualizar";

    mostrar("formularioProfessor");
}

// ======================================================

async function excluirProfessor(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este professor?"
    );

    if (!confirmar) {
        return;
    }

    const sucesso =
        await excluirRegistro("/professores/" + id);

    if (sucesso) {

        await carregarProfessores();

        mostrarMensagem("Professor excluído com sucesso.");
    }
}