// ======================================================
// PROFESSORES
// ======================================================

async function carregarProfessores() {

    tituloPagina.textContent = "Professores";

    const professores = await buscarDados("/professores");

    let html = `

        <div class="card">

            <div class="cabecalho-lista">

                <h2>Cadastro de Professores</h2>

                <button class="btn btn-success">

                    Novo Professor

                </button>

            </div>

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