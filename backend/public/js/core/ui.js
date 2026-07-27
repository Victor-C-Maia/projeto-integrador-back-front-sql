// ======================================================
// UI - Funções utilitárias da interface
// ======================================================

// ------------------------------
// Mostrar elemento
// ------------------------------

function mostrar(id) {

    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.classList.remove("oculto");
    }

}

// ------------------------------
// Esconder elemento
// ------------------------------

function esconder(id) {

    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.classList.add("oculto");
    }

}

// ------------------------------
// Limpar formulário
// ------------------------------

function limparFormulario(idFormulario) {

    const formulario = document.getElementById(idFormulario);

    if (!formulario) return;

    formulario.reset();

}

// ------------------------------
// Formatar data
// ------------------------------

function formatarData(data) {

    if (!data) return "-";

    return new Date(data).toLocaleDateString("pt-BR");

}

// ------------------------------
// Formatar nota
// ------------------------------

function formatarNota(nota) {

    if (nota === null || nota === undefined || nota === "") {
        return "-";
    }

    return Number(nota)
        .toFixed(2)
        .replace(".", ",");

}

// ------------------------------
// Confirmação
// ------------------------------

function confirmarExclusao(mensagem = "Deseja realmente excluir este registro?") {

    return confirm(mensagem);

}

// ------------------------------
// Mensagem simples
// ------------------------------

function mostrarMensagem(mensagem) {

    alert(mensagem);

}