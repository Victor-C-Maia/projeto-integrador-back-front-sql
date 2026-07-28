// ======================================================
// URL BASE DA API
// ======================================================

const API = "";

// ======================================================
// GET
// ======================================================

async function buscarDados(endpoint) {

    try {

        const resposta = await fetch(API + endpoint);

        if (!resposta.ok) {

            throw new Error("Erro ao buscar dados.");

        }

        return await resposta.json();

    } catch (erro) {

        console.error(erro);

        mostrarMensagem("Erro ao carregar dados.");

        return [];

    }

}

// ======================================================
// POST
// ======================================================

async function criarRegistro(endpoint, dados) {

    try {

        const resposta = await fetch(API + endpoint, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(dados)

        });

        if (!resposta.ok) {

            throw new Error("Erro ao criar registro.");

        }

        return await resposta.json();

    } catch (erro) {

        console.error(erro);

        mostrarMensagem("Erro ao criar registro.");

        return null;

    }

}

// ======================================================
// PUT
// ======================================================

async function atualizarRegistro(endpoint, dados) {

    try {

        const resposta = await fetch(API + endpoint, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(dados)

        });

        if (!resposta.ok) {

            throw new Error("Erro ao atualizar registro.");

        }

        return await resposta.json();

    } catch (erro) {

        console.error(erro);

        mostrarMensagem("Erro ao atualizar registro.");

        return null;

    }

}

// ======================================================
// DELETE
// ======================================================

async function excluirRegistro(endpoint) {

    try {

        const resposta = await fetch(API + endpoint, {

            method: "DELETE"

        });

        if (!resposta.ok) {

            throw new Error("Erro ao excluir registro.");

        }

        return true;

    } catch (erro) {

        console.error(erro);

        mostrarMensagem("Erro ao excluir registro.");

        return false;

    }

}

// // ======================================================
// // API - Comunicação com o Backend
// // ======================================================

// // ----------------------------
// // GET
// // ----------------------------

// async function buscarDados(endpoint) {

//     try {

//         const resposta = await fetch(endpoint);

//         if (!resposta.ok) {
//             throw new Error("Erro ao consultar a API.");
//         }

//         return await resposta.json();

//     } catch (erro) {

//         console.error(erro);

//         alert("Erro ao consultar dados.");

//         return [];

//     }

// }

// // ----------------------------
// // POST
// // ----------------------------

// async function criarRegistro(endpoint, dados) {

//     try {

//         const resposta = await fetch(endpoint, {

//             method: "POST",

//             headers: {
//                 "Content-Type": "application/json"
//             },

//             body: JSON.stringify(dados)

//         });

//         if (!resposta.ok) {
//             throw new Error("Erro ao criar registro.");
//         }

//         return await resposta.json();

//     } catch (erro) {

//         console.error(erro);

//         alert("Erro ao criar registro.");

//         return null;

//     }

// }

// // ----------------------------
// // PUT
// // ----------------------------

// async function atualizarRegistro(endpoint, dados) {

//     try {

//         const resposta = await fetch(endpoint, {

//             method: "PUT",

//             headers: {
//                 "Content-Type": "application/json"
//             },

//             body: JSON.stringify(dados)

//         });

//         if (!resposta.ok) {
//             throw new Error("Erro ao atualizar registro.");
//         }

//         return await resposta.json();

//     } catch (erro) {

//         console.error(erro);

//         alert("Erro ao atualizar registro.");

//         return null;

//     }

// }

// // ----------------------------
// // DELETE
// // ----------------------------

// async function excluirRegistro(endpoint) {

//     try {

//         const resposta = await fetch(endpoint, {

//             method: "DELETE"

//         });

//         if (!resposta.ok) {
//             throw new Error("Erro ao excluir registro.");
//         }

//         return await resposta.json();

//     } catch (erro) {

//         console.error(erro);

//         alert("Erro ao excluir registro.");

//         return null;

//     }

// }

// async function buscarDados(endpoint) {

//     try {

//         const resposta = await fetch(endpoint);

//         if (!resposta.ok) {

//             throw new Error("Erro ao acessar a API.");

//         }

//         return await resposta.json();

//     }

//     catch (erro) {

//         console.error(erro);

//         conteudo.innerHTML = `

//             <div class="card">

//                 <h2>Erro</h2>

//                 <p>Não foi possível acessar a API.</p>

//             </div>

//         `;

//         return [];

//     }

// }