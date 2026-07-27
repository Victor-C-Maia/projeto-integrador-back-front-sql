// ======================================================
// MATRÍCULAS
// ======================================================

async function carregarMatriculas() {

    tituloPagina.textContent = "Matrículas";

    const matriculas = await buscarDados("/matriculas");

    let html = `

        <div class="card">

            <div class="cabecalho-lista">

                <h2>Cadastro de Matrículas</h2>

                <button class="btn btn-success">

                    Nova Matrícula

                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Aluno</th>
                        <th>Turma</th>
                        <th>Data da Matrícula</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

    `;

    matriculas.forEach(matricula => {

        const data = matricula.data_matricula
            ? new Date(matricula.data_matricula).toLocaleDateString("pt-BR")
            : "-";

        html += `

            <tr>

                <td>${matricula.id}</td>

                <td>${matricula.aluno}</td>

                <td>${matricula.turma}</td>

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