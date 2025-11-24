let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (erro) {
            console.error("Falha ao carregar os dados:", error);
            return;
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    redenrizarCards(dadosFiltrados);
}

function redenrizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os resultados anteriores antes de exibir os novos.
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
    `
        cardContainer.appendChild(article);
    }
}

// Chama a função para carregar os dados assim que o script é executado.
carregarDados();
    