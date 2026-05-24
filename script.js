function verificarSeguranca() {

    let resultado = document.getElementById("resultado");

    if(resultado){

        resultado.innerHTML =
        "✅ Verificação concluída! Lembre-se de usar EPIs e manter o ambiente organizado.";
    }
}


/* ========================= */
/* DIREITOS */
/* ========================= */

function abrirDireito(card){

    const cards =
    document.querySelectorAll(".direito-card");

    cards.forEach(function(item){

        if(item !== card){

            item.classList.remove("ativo");
        }
    });

    card.classList.toggle("ativo");
}


/* ========================= */
/* RELATOS ANÔNIMOS */
/* ========================= */

const relatosPadrao = [

    {
        tipo: "Experiência positiva",

        titulo: "A comunicação evitou um acidente",

        texto:
        "Durante uma atividade no setor, um colaborador percebeu que havia óleo no chão e avisou a equipe antes que alguém passasse pelo local. A área foi isolada e limpa rapidamente, evitando uma possível queda.",

        sentimento: "Prevenção",

        data: "Relato fixo"
    },

    {
        tipo: "Uso correto de EPI",

        titulo: "O capacete fez diferença",

        texto:
        "Em uma movimentação de materiais, um objeto caiu próximo ao trabalhador. Como ele estava utilizando o capacete corretamente, não sofreu ferimentos. A situação reforçou a importância do uso dos EPIs.",

        sentimento: "Conscientização",

        data: "Relato fixo"
    },

    {
        tipo: "Situação de risco",

        titulo: "Organização também é segurança",

        texto:
        "Em um corredor de passagem havia caixas espalhadas e cabos soltos. Uma pessoa quase tropeçou enquanto carregava materiais. Depois disso, a equipe reorganizou o espaço e reforçou a importância de manter as áreas livres.",

        sentimento: "Alerta",

        data: "Relato fixo"
    }

];


/* ========================= */
/* CONTROLE FILTRO */
/* ========================= */

let filtroAtualRelatos = "Todos";


/* ========================= */
/* INICIAR */
/* ========================= */

document.addEventListener("DOMContentLoaded", function(){

    carregarRelatos();

    const formRelato =
    document.getElementById("formRelato");

    if(formRelato){

        formRelato.addEventListener("submit", function(event){

            event.preventDefault();

            adicionarRelato();
        });
    }

});


/* ========================= */
/* OBTER RELATOS */
/* ========================= */

function obterRelatos(){

    const relatosSalvos =
    localStorage.getItem("relatosAnonimos");


    if(relatosSalvos){

        try{

            const relatos =
            JSON.parse(relatosSalvos);

            if(
                Array.isArray(relatos)
                &&
                relatos.length > 0
            ){

                return relatos;
            }

        }catch(erro){

            localStorage.removeItem("relatosAnonimos");
        }
    }


    localStorage.setItem(
        "relatosAnonimos",
        JSON.stringify(relatosPadrao)
    );

    return relatosPadrao;
}


/* ========================= */
/* SALVAR */
/* ========================= */

function salvarRelatos(relatos){

    localStorage.setItem(
        "relatosAnonimos",
        JSON.stringify(relatos)
    );
}


/* ========================= */
/* CARREGAR RELATOS */
/* ========================= */

function carregarRelatos(){

    const listaRelatos =
    document.getElementById("listaRelatos");


    if(!listaRelatos){

        return;
    }


    const relatos =
    obterRelatos();


    let relatosFiltrados =
    relatos;


    if(filtroAtualRelatos !== "Todos"){

        relatosFiltrados =
        relatos.filter(function(relato){

            return relato.tipo === filtroAtualRelatos;
        });
    }


    listaRelatos.innerHTML = "";


    if(relatosFiltrados.length === 0){

        listaRelatos.innerHTML = `

            <div class="relato-vazio">

                <h3>
                    Nenhum relato encontrado
                </h3>

                <p>
                    Seja a primeira pessoa
                    a compartilhar uma experiência.
                </p>

            </div>

        `;

        return;
    }


    relatosFiltrados.forEach(function(relato, index){

        const card =
        document.createElement("article");


       card.className =
relato.data === "Relato fixo"
?
"relato-card relato-fixo"
:
"relato-card";

        card.innerHTML = `

            <div class="relato-topo">

                <div class="relato-anonimo">

                    <div class="avatar-anonimo">
                        A
                    </div>

                    <div>

                        <strong>
                            Anônimo
                        </strong>

                        <span>
                            ${relato.data}
                        </span>

                    </div>

                </div>

                <span class="relato-tag">
                    ${relato.tipo}
                </span>

            </div>


            <h3>
                ${relato.titulo}
            </h3>


            <p>
                ${relato.texto}
            </p>


            <div class="relato-rodape">

                <span class="relato-sentimento">
                    ${relato.sentimento}
                </span>

                <button
                    class="btn-excluir"
                    onclick="excluirRelato(${index})"
                >
                    🗑 Excluir
                </button>

            </div>

        `;


        listaRelatos.appendChild(card);

    });

}


/* ========================= */
/* ADICIONAR RELATO */
/* ========================= */

function adicionarRelato(){

    const tipoRelato =
    document.getElementById("tipoRelato");

    const tituloRelato =
    document.getElementById("tituloRelato");

    const textoRelato =
    document.getElementById("textoRelato");

    const sentimentoRelato =
    document.getElementById("sentimentoRelato");


    if(
        !tipoRelato
        ||
        !tituloRelato
        ||
        !textoRelato
        ||
        !sentimentoRelato
    ){

        alert(
            "Erro: algum campo do formulário não foi encontrado."
        );

        return;
    }


    const tipo =
    tipoRelato.value;

    const titulo =
    tituloRelato.value.trim();

    const texto =
    textoRelato.value.trim();

    const sentimento =
    sentimentoRelato.value;


    if(
        tipo === ""
        ||
        titulo === ""
        ||
        texto === ""
        ||
        sentimento === ""
    ){

        alert(
            "Por favor, preencha todos os campos."
        );

        return;
    }


    const novoRelato = {

        tipo: tipo,

        titulo: titulo,

        texto: texto,

        sentimento: sentimento,

        data: "Publicado agora"
    };


    const relatos =
    obterRelatos();


    relatos.unshift(novoRelato);


    salvarRelatos(relatos);


    document
    .getElementById("formRelato")
    .reset();


    filtroAtualRelatos = "Todos";


    atualizarBotaoAtivo("Todos");


    carregarRelatos();


    alert(
        "Relato publicado com sucesso!"
    );

}


/* ========================= */
/* FILTRAR */
/* ========================= */

function filtrarRelatos(tipo){

    filtroAtualRelatos = tipo;

    atualizarBotaoAtivo(tipo);

    carregarRelatos();
}


/* ========================= */
/* BOTÃO ATIVO */
/* ========================= */

function atualizarBotaoAtivo(tipo){

    const botoes =
    document.querySelectorAll(".filtro-btn");


    botoes.forEach(function(botao){

        botao.classList.remove("ativo");


        const textoBotao =
        botao.textContent.trim();


        if(

            tipo === "Todos"
            &&
            textoBotao === "Todos"

            ||

            tipo === "Experiência positiva"
            &&
            textoBotao === "Positivos"

            ||

            tipo === "Uso correto de EPI"
            &&
            textoBotao === "EPIs"

            ||

            tipo === "Situação de risco"
            &&
            textoBotao === "Riscos"

            ||

            tipo === "Acidente de trabalho"
            &&
            textoBotao === "Acidentes"

            ||

            tipo === "Aprendizado"
            &&
            textoBotao === "Aprendizados"

        ){

            botao.classList.add("ativo");
        }

    });

}


/* ========================= */
/* EXCLUIR RELATO */
/* ========================= */

function excluirRelato(index){

    const confirmar =
    confirm(
        "Deseja excluir este relato?"
    );


    if(!confirmar){

        return;
    }


    const relatos =
    obterRelatos();


    relatos.splice(index, 1);


    salvarRelatos(relatos);


    carregarRelatos();
}


/* ========================= */
/* LIMPAR */
/* ========================= */

function limparRelatos(){

    localStorage.removeItem("relatosAnonimos");

    filtroAtualRelatos = "Todos";

    atualizarBotaoAtivo("Todos");

    carregarRelatos();
}

