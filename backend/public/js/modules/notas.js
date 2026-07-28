// ======================================================
// NOTAS
// ======================================================

async function carregarNotas() {

    tituloPagina.textContent = "Notas";

    const [notas, matriculas] = await Promise.all([
        buscarDados("/notas"),
        buscarDados("/matriculas")
    ]);

    conteudo.innerHTML = `

        <div class="card">

            ${renderizarFormularioNota(matriculas)}

            ${renderizarTabelaNotas(notas)}

        </div>

    `;

    registrarEventosNota();

}

// ======================================================
// FORMULÁRIO
// ======================================================

function renderizarFormularioNota(matriculas) {

    return `

        <div class="cabecalho-lista">

            <h2>Cadastro de Notas</h2>

            <button
                class="btn btn-success"
                id="btnNovaNota">

                Nova Nota

            </button>

        </div>

        <form
            id="formularioNota"
            class="formulario oculto">

            <h3>Nova Nota</h3>

            <label>Matrícula</label>

            <select
                id="matriculaNota"
                required>

                <option value="">Selecione...</option>

                ${matriculas.map(matricula => `

                    <option value="${matricula.id}">

                        ${matricula.aluno}
                        -
                        ${matricula.turma}

                    </option>

                `).join("")}

            </select>

            <label>Nota</label>

            <input
                type="number"
                id="valorNota"
                min="0"
                max="10"
                step="0.01"
                required>

            <label>Tipo</label>

            <input
                type="text"
                id="tipoNota"
                placeholder="Prova"
                required>

            <label>Data da Avaliação</label>

            <input
                type="date"
                id="dataNota"
                required>

            <br><br>

            <button
                type="submit"
                class="btn btn-success">

                Salvar

            </button>

            <button
                type="button"
                class="btn btn-danger"
                id="btnCancelarNota">

                Cancelar

            </button>

        </form>

    `;

}

// ======================================================
// TABELA
// ======================================================

function renderizarTabelaNotas(notas) {

    let html = `

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Aluno</th>
                    <th>Turma</th>
                    <th>Nota</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Ações</th>

                </tr>

            </thead>

            <tbody>

    `;

    notas.forEach(nota => {

        html += `

            <tr>

                <td>${nota.id}</td>

                <td>${nota.aluno}</td>

                <td>${nota.turma}</td>

                <td>${Number(nota.nota).toFixed(2)}</td>

                <td>${nota.tipo}</td>

                <td>${formatarData(nota.data_avaliacao)}</td>

                <td>

                    <button
                        class="btn btn-primary btn-editar"
                        data-id="${nota.id}">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-excluir"
                        data-id="${nota.id}">

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

function registrarEventosNota() {

    document
        .getElementById("btnNovaNota")
        .addEventListener("click", mostrarFormularioNota);

    document
        .getElementById("btnCancelarNota")
        .addEventListener("click", esconderFormularioNota);

    document
        .getElementById("formularioNota")
        .addEventListener("submit", salvarNota);

}

// ======================================================

function mostrarFormularioNota() {

    mostrar("formularioNota");

}

// ======================================================

function esconderFormularioNota() {

    esconder("formularioNota");

}

// ======================================================

async function salvarNota(event) {

    event.preventDefault();

    const nota = {

        matricula_id:
            Number(
                document
                    .getElementById("matriculaNota")
                    .value
            ),

        nota:
            Number(
                document
                    .getElementById("valorNota")
                    .value
            ),

        tipo:
            document
                .getElementById("tipoNota")
                .value
                .trim(),

        data_avaliacao:
            document
                .getElementById("dataNota")
                .value

    };

    if (

        !nota.matricula_id ||

        nota.nota === "" ||

        isNaN(nota.nota) ||

        !nota.tipo ||

        !nota.data_avaliacao

    ) {

        mostrarMensagem("Preencha todos os campos.");

        return;

    }

    const resposta =
        await criarRegistro("/notas", nota);

    if (resposta) {

        limparFormulario("formularioNota");

        esconder("formularioNota");

        await carregarNotas();

        mostrarMensagem("Nota cadastrada com sucesso.");

    }

}