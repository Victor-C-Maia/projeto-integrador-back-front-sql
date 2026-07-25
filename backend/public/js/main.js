// ======================================================
// ELEMENTOS DA PÁGINA
// ======================================================

const tituloPagina = document.getElementById("titulo-pagina");

const conteudo = document.getElementById("conteudo-principal");

// ======================================================
// MENU
// ======================================================

document
    .getElementById("menu-dashboard")
    .addEventListener("click", mostrarDashboard);

document
    .getElementById("menu-alunos")
    .addEventListener("click", carregarAlunos);

// Os demais menus serão ligados futuramente.

// ======================================================
// DASHBOARD
// ======================================================

function mostrarDashboard() {

    tituloPagina.textContent = "Dashboard";

    conteudo.innerHTML = `

        <div class="card">

            <h2>Bem-vindo!</h2>

            <p>

                Utilize o menu lateral para acessar os módulos do sistema.

            </p>

        </div>

    `;

}

// ======================================================
// BUSCAR DADOS DA API
// ======================================================

async function buscarDados(endpoint) {

    try {

        const resposta = await fetch(endpoint);

        if (!resposta.ok) {

            throw new Error("Erro ao acessar API");

        }

        return await resposta.json();

    }

    catch (erro) {

        console.error(erro);

        conteudo.innerHTML = `

            <div class="card">

                <h2>Erro</h2>

                <p>

                    Não foi possível acessar a API.

                </p>

            </div>

        `;

        return [];

    }

}

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

                <i class="fa-solid fa-plus"></i>

                Novo Aluno

            </button>

        </div>

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Matrícula</th>
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

                <td>

                    <div class="acoes">

                        <button
                            class="btn btn-primary btn-editar"
                            data-id="${aluno.id}">

                            <i class="fa-solid fa-pen"></i>

                        </button>

                        <button
                            class="btn btn-danger btn-excluir"
                            data-id="${aluno.id}">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

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

}

// ======================================================
// INICIALIZAÇÃO
// ======================================================

mostrarDashboard();