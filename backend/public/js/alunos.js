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

                <button class="btn btn-success">

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
                        <th>Data de Nascimento</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

    `;

    alunos.forEach(aluno => {

        const data = aluno.data_nascimento
            ? new Date(aluno.data_nascimento).toLocaleDateString("pt-BR")
            : "-";

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

}