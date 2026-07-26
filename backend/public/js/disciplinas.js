// ======================================================
// DISCIPLINAS
// ======================================================

async function carregarDisciplinas() {

    tituloPagina.textContent = "Disciplinas";

    const disciplinas = await buscarDados("/disciplinas");

    let html = `

        <div class="card">

            <div class="cabecalho-lista">

                <h2>Cadastro de Disciplinas</h2>

                <button class="btn btn-success">

                    Nova Disciplina

                </button>

            </div>

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

                <td>${disciplina.carga_horaria} horas</td>

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