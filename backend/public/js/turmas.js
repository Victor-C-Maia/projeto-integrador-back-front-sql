// ======================================================
// TURMAS
// ======================================================

async function carregarTurmas() {

    tituloPagina.textContent = "Turmas";

    const turmas = await buscarDados("/turmas");

    let html = `

        <div class="card">

            <div class="cabecalho-lista">

                <h2>Cadastro de Turmas</h2>

                <button class="btn btn-success">

                    Nova Turma

                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Código</th>
                        <th>Disciplina</th>
                        <th>Professor</th>
                        <th>Semestre</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

    `;

    turmas.forEach(turma => {

        html += `

            <tr>

                <td>${turma.id}</td>

                <td>${turma.codigo}</td>

                <td>${turma.disciplina}</td>

                <td>${turma.professor}</td>

                <td>${turma.semestre}</td>

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