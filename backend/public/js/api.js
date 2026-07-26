async function buscarDados(endpoint) {

    try {

        const resposta = await fetch(endpoint);

        if (!resposta.ok) {

            throw new Error("Erro ao acessar a API.");

        }

        return await resposta.json();

    }

    catch (erro) {

        console.error(erro);

        conteudo.innerHTML = `

            <div class="card">

                <h2>Erro</h2>

                <p>Não foi possível acessar a API.</p>

            </div>

        `;

        return [];

    }

}