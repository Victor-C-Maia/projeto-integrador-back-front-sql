// ======================================================
// ALUNOS
// ======================================================


// let alunoEmEdicao = null; // CONTROLE DE EDIÇÃO

// async function carregarAlunos() {

//     tituloPagina.textContent = "Alunos";

//     const alunos = await buscarDados("/alunos");

//     let html = `

//     <div class="card">

//         <div class="cabecalho-lista">

//             <h2>Cadastro de Alunos</h2>

//             <button
//                 class="btn btn-success"
//                 id="btnNovoAluno">

//                 Novo Aluno

//             </button>

//         </div>

//         <form
//             id="formularioAluno"
//             class="formulario oculto">

//             <h3>Novo Aluno</h3>

//             <label>Nome</label>

//             <input
//                 type="text"
//                 id="nomeAluno">

//             <label>Email</label>

//             <input
//                 type="email"
//                 id="emailAluno">

//             <label>Matrícula</label>

//             <input
//                 type="text"
//                 id="matriculaAluno">

//             <label>Data de nascimento</label>

//             <input
//                 type="date"
//                 id="dataNascimentoAluno">

//             <br><br>

//            <button
//                 type="submit"
//                 class="btn btn-success"
//                 id="btnSalvarAluno">

//                 Salvar

//             </button>

//             <button
//                 type="button"
//                 class="btn btn-danger"
//                 id="btnCancelarAluno">

//                 Cancelar

//             </button>

//         </form>

//         <table>

//             <thead>

//                     <tr>

//                         <th>ID</th>
//                         <th>Nome</th>
//                         <th>Email</th>
//                         <th>Matrícula</th>
//                         <th>Data de Nascimento</th>
//                         <th>Ações</th>

//                     </tr>

//                 </thead>

//                 <tbody>

//     `;

//     alunos.forEach(aluno => {

//         const data = formatarData(aluno.data_nascimento);

//         html += `

//             <tr>

//                 <td>${aluno.id}</td>

//                 <td>${aluno.nome}</td>

//                 <td>${aluno.email}</td>

//                 <td>${aluno.matricula}</td>

//                 <td>${data}</td>

//                 <td>

//                     <button
//                         class="btn btn-primary btn-editar"
//                         data-id="${aluno.id}">

//                         Editar

//                     </button>

//                     <button
//                         class="btn btn-danger btn-excluir"
//                         data-id="${aluno.id}">

//                         Excluir

//                     </button>

//                 </td>

//             </tr>

//         `;

//     });

//     html += `

//                 </tbody>

//             </table>

//         </div>

//     `;

//     conteudo.innerHTML = html;

//     document
//         .getElementById("btnNovoAluno")
//         .addEventListener("click", mostrarFormularioAluno);

//     document
//         .getElementById("btnCancelarAluno")
//         .addEventListener("click", esconderFormularioAluno);

//     document
//         .getElementById("btnSalvarAluno")
//         .addEventListener("click", salvarAluno);

// }

// ======================================================
// ALUNOS
// ======================================================

let alunoEmEdicao = null;

// ======================================================
// CARREGAMENTO
// ======================================================

async function carregarAlunos() {

    tituloPagina.textContent = "Alunos";

    const alunos = await buscarDados("/alunos");

    conteudo.innerHTML = `

        <div class="card">

            ${renderizarFormularioAluno()}

            ${renderizarTabelaAlunos(alunos)}

        </div>

    `;

    registrarEventosAluno();

}

// ======================================================
// FORMULÁRIO
// ======================================================

function renderizarFormularioAluno() {

    return `

        <div class="cabecalho-lista">

            <h2>Cadastro de Alunos</h2>

            <button
                class="btn btn-success"
                id="btnNovoAluno">

                Novo Aluno

            </button>

        </div>

        <form
            id="formularioAluno"
            class="formulario oculto">

            <h3 id="tituloFormularioAluno">

                Novo Aluno

            </h3>

            <label>Nome</label>

            <input
                type="text"
                id="nomeAluno"
                required>

            <label>Email</label>

            <input
                type="email"
                id="emailAluno"
                required>

            <label>Matrícula</label>

            <input
                type="text"
                id="matriculaAluno"
                required>

            <label>Data de nascimento</label>

            <input
                type="date"
                id="dataNascimentoAluno">

            <br><br>

            <button
                type="submit"
                class="btn btn-success"
                id="btnSalvarAluno">

                Salvar

            </button>

            <button
                type="button"
                class="btn btn-danger"
                id="btnCancelarAluno">

                Cancelar

            </button>

        </form>

    `;

}

// ======================================================
// TABELA
// ======================================================

function renderizarTabelaAlunos(alunos) {

    let html = `

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Matrícula</th>
                    <th>Data de Nascimento</th>
                    <th>Ações</th>

                </tr>

            </thead>

            <tbody>

    `;

    alunos.forEach(aluno => {

        html += `

            <tr>

                <td>${aluno.id}</td>

                <td>${aluno.nome}</td>

                <td>${aluno.email}</td>

                <td>${aluno.matricula}</td>

                <td>${formatarData(aluno.data_nascimento)}</td>

                <td>

                    <button
                        class="btn btn-primary btn-editar"
                        data-id="${aluno.id}">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-excluir"
                        data-id="${aluno.id}">

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

function registrarEventosAluno() {

    document
        .getElementById("btnNovoAluno")
        .addEventListener("click", mostrarFormularioAluno);

    document
        .getElementById("btnCancelarAluno")
        .addEventListener("click", esconderFormularioAluno);

    document
        .getElementById("formularioAluno")
        .addEventListener("submit", salvarAluno);

    document
        .querySelectorAll(".btn-editar")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                editarAluno(botao.dataset.id);

            });

        });

    document
        .querySelectorAll(".btn-excluir")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                excluirAluno(botao.dataset.id);

            });

        });

}

// ======================================================

function mostrarFormularioAluno() {

    alunoEmEdicao = null;

    limparFormulario("formularioAluno");

    document
        .getElementById("tituloFormularioAluno")
        .textContent = "Novo Aluno";

    document
        .getElementById("btnSalvarAluno")
        .textContent = "Salvar";

    mostrar("formularioAluno");

}

// ======================================================

function esconderFormularioAluno() {

    esconder("formularioAluno");

}

// ======================================================

async function salvarAluno(event) {

    event.preventDefault();

    const aluno = {

        nome:
            document
                .getElementById("nomeAluno")
                .value
                .trim(),

        email:
            document
                .getElementById("emailAluno")
                .value
                .trim(),

        matricula:
            document
                .getElementById("matriculaAluno")
                .value
                .trim(),

        data_nascimento:
            document
                .getElementById("dataNascimentoAluno")
                .value

    };

    if (

        !aluno.nome ||

        !aluno.email ||

        !aluno.matricula

    ) {

        mostrarMensagem("Preencha todos os campos obrigatórios.");

        return;

    }

    let resposta;

    let mensagemSucesso;

    if (alunoEmEdicao === null) {

        resposta =
            await criarRegistro("/alunos", aluno);

        mensagemSucesso =
            "Aluno cadastrado com sucesso.";

    }
    else {

        resposta =
            await atualizarRegistro(

                "/alunos/" + alunoEmEdicao,

                aluno

            );

        mensagemSucesso =
            "Aluno atualizado com sucesso.";

    }

    if (resposta) {

        limparFormulario("formularioAluno");

        esconder("formularioAluno");

        alunoEmEdicao = null;

        await carregarAlunos();

        mostrarMensagem(mensagemSucesso);

    }

}

// ======================================================

async function editarAluno(id) {

    const aluno =
        await buscarDados("/alunos/" + id);

    if (!aluno) {

        mostrarMensagem("Aluno não encontrado.");

        return;

    }

    alunoEmEdicao = aluno.id;

    document
        .getElementById("nomeAluno")
        .value = aluno.nome;

    document
        .getElementById("emailAluno")
        .value = aluno.email;

    document
        .getElementById("matriculaAluno")
        .value = aluno.matricula;

    document
        .getElementById("dataNascimentoAluno")
        .value =
            aluno.data_nascimento
                ? aluno.data_nascimento.substring(0, 10)
                : "";

    document
        .getElementById("tituloFormularioAluno")
        .textContent = "Editar Aluno";

    document
        .getElementById("btnSalvarAluno")
        .textContent = "Atualizar";

    mostrar("formularioAluno");

}

// ======================================================

async function excluirAluno(id) {

    const confirmar = confirm(

        "Deseja realmente excluir este aluno?"

    );

    if (!confirmar) {

        return;

    }

    const sucesso =
        await excluirRegistro("/alunos/" + id);

    if (sucesso) {

        limparFormulario("formularioAluno");

        esconder("formularioAluno");

        alunoEmEdicao = null;

        await carregarAlunos();

        mostrarMensagem(

            "Aluno excluído com sucesso."

        );

    }

}

// ======================================================

// function mostrarFormularioAluno() {

//     mostrar("formularioAluno");

// }

// // ======================================================

// function esconderFormularioAluno() {

//     esconder("formularioAluno");

// }

// // ======================================================

// async function salvarAluno(event) {
//     event.preventDefault();
//     const nome =
//         document.getElementById("nomeAluno").value.trim();

//     const email =
//         document.getElementById("emailAluno").value.trim();

//     const matricula =
//         document.getElementById("matriculaAluno").value.trim();

//     const data_nascimento =
//         document.getElementById("dataNascimentoAluno").value;

//     if (!nome || !email || !matricula) {

//         alert("Preencha os campos obrigatórios.");

//         return;

//     }

//     const aluno = {

//         nome,
//         email,
//         matricula,
//         data_nascimento

//     };

//     const resposta = await criarRegistro("/alunos", aluno);

//     if (resposta) {

//         limparFormulario("formularioAluno");

//         esconder("formularioAluno");

//         await carregarAlunos();

//         mostrarMensagem("Aluno cadastrado com sucesso.");

//     }

// }