// ======================================================
// NOTAS
// ======================================================

async function carregarNotas() {

    tituloPagina.textContent = "Notas";

    const notas = await buscarDados("/notas");

    let html = `

        <div class="card">

            <div class="cabecalho-lista">

                <h2>Lançamento de Notas</h2>

                <button class="btn btn-success">

                    Nova Nota

                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Aluno</th>
                        <th>Turma</th>
                        <th>Nota</th>
                        <th>Tipo</th>
                        <th>Data da Avaliação</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

    `;

    notas.forEach(nota => {

        const data = nota.data_avaliacao
            ? new Date(nota.data_avaliacao).toLocaleDateString("pt-BR")
            : "-";

        const valorNota = Number(nota.nota).toFixed(2).replace(".", ",");

        html += `

            <tr>

                <td>${nota.id}</td>

                <td>${nota.aluno}</td>

                <td>${nota.turma}</td>

                <td>${valorNota}</td>

                <td>${nota.tipo}</td>

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