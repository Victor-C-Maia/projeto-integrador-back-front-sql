// ======================================================
// BOLETIM
// ======================================================

async function carregarBoletim() {

    tituloPagina.textContent = "Boletim";

    const alunos = await buscarDados("/alunos");

    let opcoes = "";

    alunos.forEach(aluno => {

        opcoes += `

            <option value="${aluno.id}">

                ${aluno.nome}

            </option>

        `;

    });

    conteudo.innerHTML = `

        <div class="card">

            <h2>Consulta de Boletim</h2>

            <br>

            <label>Aluno</label>

            <select id="alunoSelecionado">

                ${opcoes}

            </select>

            <br><br>

            <button
                class="btn btn-success"
                id="btnBuscarBoletim">

                Buscar Boletim

            </button>

            <br><br>

            <div id="resultadoBoletim"></div>

        </div>

    `;

    document
        .getElementById("btnBuscarBoletim")
        .addEventListener("click", buscarBoletim);

}

// ======================================================

async function buscarBoletim() {

    const alunoId =
        document.getElementById("alunoSelecionado").value;

    const boletim =
        await buscarDados(`/boletim/aluno/${alunoId}`);

    let html = `

        <table>

            <thead>

                <tr>

                    <th>Disciplina</th>

                    <th>Professor</th>

                    <th>Turma</th>

                    <th>Nota</th>

                    <th>Tipo</th>

                    <th>Data</th>

                    <th>Situação</th>

                </tr>

            </thead>

            <tbody>

    `;

    boletim.forEach(item => {

        const data = item.data_avaliacao
            ? new Date(item.data_avaliacao)
                .toLocaleDateString("pt-BR")
            : "-";

        const nota =
            Number(item.nota)
                .toFixed(2)
                .replace(".", ",");

        const classe =
            item.situacao === "Aprovado"
                ? "status-aprovado"
                : "status-reprovado";

        html += `

            <tr>

                <td>${item.disciplina_nome}</td>

                <td>${item.professor_nome}</td>

                <td>${item.turma_codigo}</td>

                <td>${nota}</td>

                <td>${item.tipo}</td>

                <td>${data}</td>

                <td>

                    <span class="${classe}">

                        ${item.situacao}

                    </span>

                </td>

            </tr>

        `;

    });

    html += `

            </tbody>

        </table>

    `;

    document.getElementById("resultadoBoletim").innerHTML = html;

}