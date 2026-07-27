function mostrarDashboard() {

    tituloPagina.textContent = "Dashboard";

    conteudo.innerHTML = `

        <div class="card">

            <h2>Bem-vindo!</h2>

            <p>

                Este é o Sistema Escolar desenvolvido em
                <strong>Node.js + Express + PostgreSQL</strong>.

            </p>

            <br>

            <p>

                Utilize o menu lateral para navegar entre os módulos.

            </p>

        </div>

    `;

}