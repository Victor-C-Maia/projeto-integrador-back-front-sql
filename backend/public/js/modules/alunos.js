// ======================================================
// ALUNOS
// ======================================================

async function carregarAlunos() {

    tituloPagina.textContent = "Alunos";

    const alunos = await buscarDados("/alunos");

    let html = `

    <div class="card">

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

            <h3>Novo Aluno</h3>

            <label>Nome</label>

            <input
                type="text"
                id="nomeAluno">

            <label>Email</label>

            <input
                type="email"
                id="emailAluno">

            <label>Matrícula</label>

            <input
                type="text"
                id="matriculaAluno">

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

        const data = formatarData(aluno.data_nascimento);

        html += `

            <tr>

                <td>${aluno.id}</td>

                <td>${aluno.nome}</td>

                <td>${aluno.email}</td>

                <td>${aluno.matricula}</td>

                <td>${data}</td>

                <td>

                    <button class="btn btn-primary">

                        Editar

                    </button>

                    <button class="btn btn-danger">

                        Excluir

                    </button>

                </td>

            </tr>

        `;

    });

    html += `

                </tbody>

            </table>

        </div>

    `;

    conteudo.innerHTML = html;

    document
        .getElementById("btnNovoAluno")
        .addEventListener("click", mostrarFormularioAluno);

    document
        .getElementById("btnCancelarAluno")
        .addEventListener("click", esconderFormularioAluno);

    document
        .getElementById("btnSalvarAluno")
        .addEventListener("click", salvarAluno);

}

// ======================================================

function mostrarFormularioAluno() {

    mostrar("formularioAluno");

}

// ======================================================

function esconderFormularioAluno() {

    esconder("formularioAluno");

}

// ======================================================

async function salvarAluno(event) {
    event.preventDefault();
    const nome =
        document.getElementById("nomeAluno").value.trim();

    const email =
        document.getElementById("emailAluno").value.trim();

    const matricula =
        document.getElementById("matriculaAluno").value.trim();

    const data_nascimento =
        document.getElementById("dataNascimentoAluno").value;

    if (!nome || !email || !matricula) {

        alert("Preencha os campos obrigatórios.");

        return;

    }

    const aluno = {

        nome,
        email,
        matricula,
        data_nascimento

    };

    const resposta = await criarRegistro("/alunos", aluno);

    if (resposta) {

        limparFormulario("formularioAluno");

        esconder("formularioAluno");

        await carregarAlunos();

        mostrarMensagem("Aluno cadastrado com sucesso.");

    }

}