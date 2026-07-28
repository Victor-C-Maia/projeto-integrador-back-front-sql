// ======================================================
// MATRÍCULAS
// ======================================================

let matriculaEmEdicao = null;

async function carregarMatriculas() {

    tituloPagina.textContent = "Matrículas";

    const [matriculas, alunos, turmas] = await Promise.all([
        buscarDados("/matriculas"),
        buscarDados("/alunos"),
        buscarDados("/turmas")
    ]);

    conteudo.innerHTML = `

        <div class="card">

            ${renderizarFormularioMatricula(alunos, turmas)}

            ${renderizarTabelaMatriculas(matriculas)}

        </div>

    `;

    registrarEventosMatricula();

}

// ======================================================
// FORMULÁRIO
// ======================================================

function renderizarFormularioMatricula(alunos, turmas) {

    return `

        <div class="cabecalho-lista">

            <h2>Cadastro de Matrículas</h2>

            <button
                class="btn btn-success"
                id="btnNovaMatricula">

                Nova Matrícula

            </button>

        </div>

        <form
            id="formularioMatricula"
            class="formulario oculto">

            <h3 id="tituloFormularioMatricula">

                Nova Matrícula

            </h3>

            <label>Aluno</label>

            <select
                id="alunoMatricula"
                required>

                <option value="">Selecione...</option>

                ${alunos.map(aluno => `

                    <option value="${aluno.id}">

                        ${aluno.nome}

                    </option>

                `).join("")}

            </select>

            <label>Turma</label>

            <select
                id="turmaMatricula"
                required>

                <option value="">Selecione...</option>

                ${turmas.map(turma => `

                    <option value="${turma.id}">

                        ${turma.codigo}

                    </option>

                `).join("")}

            </select>

            <label>Data da Matrícula</label>

            <input
                type="date"
                id="dataMatricula"
                required>

            <br><br>

            <button
                type="submit"
                class="btn btn-success"
                id="btnSalvarMatricula">

                Salvar

            </button>

            <button
                type="button"
                class="btn btn-danger"
                id="btnCancelarMatricula">

                Cancelar

            </button>

        </form>

    `;

}

// ======================================================
// TABELA
// ======================================================

function renderizarTabelaMatriculas(matriculas) {

    let html = `

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Aluno</th>
                    <th>Turma</th>
                    <th>Data</th>
                    <th>Ações</th>

                </tr>

            </thead>

            <tbody>

    `;

    matriculas.forEach(matricula => {

        const data = formatarData(matricula.data_matricula);

        html += `

            <tr>

                <td>${matricula.id}</td>

                <td>${matricula.aluno}</td>

                <td>${matricula.turma}</td>

                <td>${data}</td>

                <td>

                    <button
                        class="btn btn-primary btn-editar"
                        data-id="${matricula.id}">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-excluir"
                        data-id="${matricula.id}">

                        Excluir

                    </button>

                </td>

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

function registrarEventosMatricula() {

    document
        .getElementById("btnNovaMatricula")
        .addEventListener("click", mostrarFormularioMatricula);

    document
        .getElementById("btnCancelarMatricula")
        .addEventListener("click", esconderFormularioMatricula);

    document
        .getElementById("formularioMatricula")
        .addEventListener("submit", salvarMatricula);
    document
        .querySelectorAll(".btn-editar")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                editarMatricula(botao.dataset.id);

            });

        });

    document
        .querySelectorAll(".btn-excluir")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                excluirMatricula(botao.dataset.id);

            });

        });

}

// ======================================================

function mostrarFormularioMatricula() {

    matriculaEmEdicao = null;

    limparFormulario("formularioMatricula");

    document
        .getElementById("alunoMatricula")
        .selectedIndex = 0;

    document
        .getElementById("turmaMatricula")
        .selectedIndex = 0;

    document
        .getElementById("tituloFormularioMatricula")
        .textContent = "Nova Matrícula";

    document
        .getElementById("btnSalvarMatricula")
        .textContent = "Salvar";

    mostrar("formularioMatricula");

}

// ======================================================

function esconderFormularioMatricula() {

    esconder("formularioMatricula");

}

// ======================================================

async function salvarMatricula(event) {

    event.preventDefault();

    const matricula = {

        aluno_id:
            Number(document.getElementById("alunoMatricula").value),

        turma_id:
            Number(document.getElementById("turmaMatricula").value),

        data_matricula:
            document.getElementById("dataMatricula").value

    };

    if (
        !matricula.aluno_id ||
        !matricula.turma_id ||
        !matricula.data_matricula
    ) {

        mostrarMensagem("Preencha todos os campos.");

        return;

    }

    let resposta;

    let mensagemSucesso;

    if (matriculaEmEdicao === null) {

        resposta =
            await criarRegistro("/matriculas", matricula);

        mensagemSucesso =
            "Matrícula cadastrada com sucesso.";

    }
    else {

        resposta =
            await atualizarRegistro(

                "/matriculas/" + matriculaEmEdicao,

                matricula

            );

        mensagemSucesso =
            "Matrícula atualizada com sucesso.";

    }

    if (resposta) {

        limparFormulario("formularioMatricula");

        esconder("formularioMatricula");

        matriculaEmEdicao = null;

        await carregarMatriculas();

        mostrarMensagem(mensagemSucesso);

    }

}

async function editarMatricula(id) {

    const matricula =
        await buscarDados("/matriculas/" + id);

    if (!matricula) {

        mostrarMensagem("Matrícula não encontrada.");

        return;

    }

    matriculaEmEdicao = matricula.id;

    document
        .getElementById("alunoMatricula")
        .value = matricula.aluno_id;

    document
        .getElementById("turmaMatricula")
        .value = matricula.turma_id;

    document
        .getElementById("dataMatricula")
        .value =
            matricula.data_matricula
                ? matricula.data_matricula.substring(0, 10)
                : "";

    document
        .getElementById("tituloFormularioMatricula")
        .textContent = "Editar Matrícula";

    document
        .getElementById("btnSalvarMatricula")
        .textContent = "Atualizar";

    mostrar("formularioMatricula");

}

async function excluirMatricula(id) {

    const confirmar = confirm(

        "Deseja realmente excluir esta matrícula?"

    );

    if (!confirmar) {

        return;

    }

    const sucesso =
        await excluirRegistro("/matriculas/" + id);

    if (sucesso) {

        await carregarMatriculas();

        mostrarMensagem(

            "Matrícula excluída com sucesso."

        );

    }

}