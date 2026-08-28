// ======================================================
// SISTEMA DE CONTROLE DE ACESSO
// INDÚSTRIAS WAYNE
// ======================================================


// ======================================================
// ARRAY DE USUÁRIOS
// ======================================================

const usuarios = [

    {
        id: 1,
        nome: "João Silva",
        email: "joao@wayne.com",
        senha: "1234",
        funcao: "Funcionário",
        nivel: 1,
        status: "Ativo"
    },

    {
        id: 2,
        nome: "Maria Oliveira",
        email: "maria@wayne.com",
        senha: "1234",
        funcao: "Gerente",
        nivel: 2,
        status: "Ativo"
    },

    {
        id: 3,
        nome: "Bruce Wayne",
        email: "bruce@wayne.com",
        senha: "1234",
        funcao: "Administrador de Segurança",
        nivel: 3,
        status: "Ativo"
    }

];


// ======================================================
// ARRAY DE ÁREAS RESTRITAS
// ======================================================

const areas = [

    {
        id: 1,
        nome: "Produção",
        descricao: "Área operacional da indústria.",
        icone: "🏭",
        nivelMinimo: 1
    },

    {
        id: 2,
        nome: "Refeitório",
        descricao: "Área destinada aos funcionários.",
        icone: "🍽️",
        nivelMinimo: 1
    },

    {
        id: 3,
        nome: "Administração",
        descricao: "Setor administrativo da empresa.",
        icone: "💼",
        nivelMinimo: 2
    },

    {
        id: 4,
        nome: "Laboratório",
        descricao: "Área de pesquisa e desenvolvimento.",
        icone: "🔬",
        nivelMinimo: 2
    },

    {
        id: 5,
        nome: "Sala de Segurança",
        descricao: "Centro de monitoramento da indústria.",
        icone: "🛡️",
        nivelMinimo: 3
    },

    {
        id: 6,
        nome: "Cofre de Dados",
        descricao: "Área com informações altamente restritas.",
        icone: "🔐",
        nivelMinimo: 3
    }

];


// ======================================================
// ARRAY DE REGISTROS
// ======================================================

const registros = [];


// ======================================================
// USUÁRIO ATUALMENTE LOGADO
// ======================================================

let usuarioAtual = null;


// ======================================================
// SELECIONANDO ELEMENTOS DO HTML
// ======================================================

const secaoLogin =
    document.querySelector("#secao-login");


const secaoSistema =
    document.querySelector("#secao-sistema");


const formularioLogin =
    document.querySelector("#formulario-login");


const mensagemLogin =
    document.querySelector("#mensagem-login");


const botaoSair =
    document.querySelector("#botao-sair");


const nomeUsuarioCabecalho =
    document.querySelector("#nome-usuario-cabecalho");


const funcaoUsuarioCabecalho =
    document.querySelector("#funcao-usuario-cabecalho");


const avatarCabecalho =
    document.querySelector("#avatar-cabecalho");


const nomeBoasVindas =
    document.querySelector("#nome-boas-vindas");


const totalUsuarios =
    document.querySelector("#total-usuarios");


const totalAreas =
    document.querySelector("#total-areas");


const nivelUsuario =
    document.querySelector("#nivel-usuario");


const areasPainel =
    document.querySelector("#areas-painel");


const todasAreas =
    document.querySelector("#todas-areas");


const tabelaUsuarios =
    document.querySelector("#tabela-usuarios");


const conteinerRegistros =
    document.querySelector("#conteiner-registros");


const tituloPagina =
    document.querySelector("#titulo-pagina");


// ======================================================
// EVENTO DO FORMULÁRIO DE LOGIN
// ======================================================

formularioLogin.addEventListener(
    "submit",
    function(evento) {

        // Impede o navegador de atualizar a página

        evento.preventDefault();


        // Pega o e-mail digitado

        const emailDigitado =
            document.querySelector("#email-login").value;


        // Pega a senha digitada

        const senhaDigitada =
            document.querySelector("#senha-login").value;


        // Procura o usuário dentro do array

        const usuarioEncontrado =
            usuarios.find(function(usuario) {

                return (
                    usuario.email === emailDigitado &&
                    usuario.senha === senhaDigitada
                );

            });


        // ==================================================
        // USUÁRIO NÃO ENCONTRADO
        // ==================================================

        if (!usuarioEncontrado) {

            mensagemLogin.textContent =
                "E-mail ou senha incorretos.";

            mensagemLogin.style.color =
                "#d9534f";

            return;

        }


        // ==================================================
        // VERIFICANDO STATUS DO USUÁRIO
        // ==================================================

        if (usuarioEncontrado.status !== "Ativo") {

            mensagemLogin.textContent =
                "Este usuário está desativado.";

            mensagemLogin.style.color =
                "#d9534f";

            return;

        }


        // ==================================================
        // LOGIN APROVADO
        // ==================================================

       usuarioAtual = usuarioEncontrado;


// Registrar login

registrarAcesso(
    usuarioAtual.nome,
    "Login realizado com sucesso"
);


// Salvar o usuário atual no navegador

localStorage.setItem(
    "usuarioAtual",
    JSON.stringify(usuarioAtual)
);


// Redirecionar o usuário conforme seu nível

redirecionarUsuario();



// ======================================================
// FUNÇÃO PARA MOSTRAR O SISTEMA
// ======================================================

function mostrarSistema() {

    // Esconde a tela de login

    secaoLogin.classList.add("oculto");


    // Mostra o sistema

    secaoSistema.classList.remove("oculto");


    // Mostra nome no cabeçalho

    nomeUsuarioCabecalho.textContent =
        usuarioAtual.nome;


    // Mostra função no cabeçalho

    funcaoUsuarioCabecalho.textContent =
        usuarioAtual.funcao;


    // Primeira letra do nome

    avatarCabecalho.textContent =
        usuarioAtual.nome.charAt(0);


    // Nome no cartão de boas-vindas

    nomeBoasVindas.textContent =
        usuarioAtual.nome.split(" ")[0];


    // Quantidade de usuários

    totalUsuarios.textContent =
        usuarios.length;


    // Quantidade de áreas

    totalAreas.textContent =
        areas.length;


    // Nível do usuário

    nivelUsuario.textContent =
        `Nível ${usuarioAtual.nivel}`;


    // Mostrar áreas

    renderizarAreasPainel();


    renderizarTodasAreas();


    // Mostrar usuários

    renderizarUsuarios();


    // Mostrar registros

    renderizarRegistros();

}


// ======================================================
// BOTÃO SAIR
// ======================================================

botaoSair.addEventListener(
    "click",
    function() {

        // Registrar logout

        if (usuarioAtual) {

            registrarAcesso(
                usuarioAtual.nome,
                "Logout realizado"
            );

        }


        // Limpar usuário atual

        usuarioAtual = null;


        // Esconder sistema

        secaoSistema.classList.add("oculto");


        // Mostrar login

        secaoLogin.classList.remove("oculto");


        // Limpar formulário

        formularioLogin.reset();


        // Limpar mensagem

        mensagemLogin.textContent = "";


        // Voltar para o painel

        mudarSecao("painel");

    }
);


// ======================================================
// FUNÇÃO PARA VERIFICAR AUTORIZAÇÃO
// ======================================================

function possuiAcesso(area) {

    return usuarioAtual.nivel >= area.nivelMinimo;

}


// ======================================================
// RENDERIZAR ÁREAS DO PAINEL
// ======================================================

function renderizarAreasPainel() {

    // Limpa o conteúdo anterior

    areasPainel.innerHTML = "";


    // Percorre todas as áreas

    areas.forEach(function(area) {

        // Verifica se o usuário pode acessar

        const autorizado =
            possuiAcesso(area);


        // Cria o cartão

        const cartao =
            criarCartaoArea(
                area,
                autorizado
            );


        // Coloca o cartão na tela

        areasPainel.appendChild(cartao);

    });

}


// ======================================================
// RENDERIZAR TODAS AS ÁREAS
// ======================================================

function renderizarTodasAreas() {

    todasAreas.innerHTML = "";


    areas.forEach(function(area) {

        const autorizado =
            possuiAcesso(area);


        const cartao =
            criarCartaoArea(
                area,
                autorizado
            );


        todasAreas.appendChild(cartao);

    });

}


// ======================================================
// CRIAR CARTÃO DE ÁREA
// ======================================================

function criarCartaoArea(
    area,
    autorizado
) {

    // Criar elemento div

    const cartao =
        document.createElement("div");


    // Adicionar classe

    cartao.classList.add(
        "cartao-area"
    );


    // Criar conteúdo HTML

    cartao.innerHTML = `

        <div class="icone-area">
            ${area.icone}
        </div>

        <h4>
            ${area.nome}
        </h4>

        <p>
            ${area.descricao}
        </p>

        <span class="
            etiqueta-acesso
            ${
                autorizado
                    ? "acesso-autorizado"
                    : "acesso-negado"
            }
        ">

            ${
                autorizado
                    ? "✓ ACESSO AUTORIZADO"
                    : "✕ ACESSO NEGADO"
            }

        </span>

    `;


    // Retorna o cartão criado

    return cartao;

}


// ======================================================
// RENDERIZAR USUÁRIOS
// ======================================================

function renderizarUsuarios() {

    // Limpa a tabela

    tabelaUsuarios.innerHTML = "";


    // Percorre os usuários

    usuarios.forEach(function(usuario) {

        // Cria uma linha

        const linha =
            document.createElement("tr");


        // Cria as células

        linha.innerHTML = `

            <td>
                <strong>
                    ${usuario.nome}
                </strong>
            </td>

            <td>
                ${usuario.email}
            </td>

            <td class="funcao">
                ${usuario.funcao}
            </td>

            <td class="nivel">
                Nível ${usuario.nivel}
            </td>

            <td>
                ${usuario.status}
            </td>

        `;


        // Adiciona linha na tabela

        tabelaUsuarios.appendChild(linha);

    });

}


// ======================================================
// REGISTRAR ACESSO
// ======================================================

function registrarAcesso(
    usuario,
    acao
) {

    // Criar data e horário atual

    const agora =
        new Date();


    // Criar objeto do registro

    const novoRegistro = {

        usuario: usuario,

        acao: acao,

        horario:
            agora.toLocaleString("pt-BR")

    };


    // Adicionar no início do array

    registros.unshift(
        novoRegistro
    );

}


// ======================================================
// RENDERIZAR REGISTROS
// ======================================================

function renderizarRegistros() {

    // Limpa os registros

    conteinerRegistros.innerHTML = "";


    // Verifica se não existem registros

    if (registros.length === 0) {

        conteinerRegistros.innerHTML = `

            <div class="item-registro">

                <div>

                    <div class="usuario-registro">
                        Nenhum registro
                    </div>

                    <div class="acao-registro">
                        Ainda não existem registros.
                    </div>

                </div>

            </div>

        `;

        return;

    }


    // Percorre os registros

    registros.forEach(
        function(registro) {

            // Criar elemento

            const item =
                document.createElement("div");


            // Adicionar classe

            item.classList.add(
                "item-registro"
            );


            // Criar conteúdo

            item.innerHTML = `

                <div>

                    <div class="usuario-registro">
                        ${registro.usuario}
                    </div>

                    <div class="acao-registro">
                        ${registro.acao}
                    </div>

                </div>

                <div class="horario-registro">
                    ${registro.horario}
                </div>

            `;


            // Adicionar na tela

            conteinerRegistros.appendChild(
                item
            );

        }
    );

}


// ======================================================
// NAVEGAÇÃO DO SISTEMA
// ======================================================

const itensNavegacao =
    document.querySelectorAll(
        ".item-navegacao"
    );


// Adicionar evento para cada botão

itensNavegacao.forEach(
    function(botao) {

        botao.addEventListener(
            "click",
            function() {

                const secao =
                    botao.dataset.secao;


                mudarSecao(secao);

            }
        );

    }
);


// ======================================================
// FUNÇÃO PARA MUDAR DE SEÇÃO
// ======================================================

function mudarSecao(secao) {

    // Se não estiver logado, não permite navegar

    if (!usuarioAtual) {

        return;

    }


    // Selecionar todas as seções

    const secoes =
        document.querySelectorAll(
            ".secao-conteudo"
        );


    // Esconder todas

    secoes.forEach(
        function(elemento) {

            elemento.classList.add(
                "oculto"
            );

        }
    );


    // Encontrar a seção escolhida

    const secaoSelecionada =
        document.querySelector(
            `#${secao}-secao`
        );


    // Mostrar seção

    if (secaoSelecionada) {

        secaoSelecionada.classList.remove(
            "oculto"
        );

    }


    // Remover classe ativo de todos

    itensNavegacao.forEach(
        function(botao) {

            botao.classList.remove(
                "ativo"
            );

        }
    );


    // Encontrar botão correspondente

    const botaoAtivo =
        document.querySelector(
            `[data-secao="${secao}"]`
        );


    // Marcar botão como ativo

    if (botaoAtivo) {

        botaoAtivo.classList.add(
            "ativo"
        );

    }


    // Títulos das páginas

    const titulos = {

        painel: "Painel",

        usuarios: "Usuários",

        areas: "Áreas restritas",

        registros: "Registros"

    };


    // Alterar título

    tituloPagina.textContent =
        titulos[secao];

}
// ======================================================
// REDIRECIONAR USUÁRIO CONFORME O NÍVEL
// ======================================================

function redirecionarUsuario() {

    if (usuarioAtual.nivel === 1) {

        window.location.href = "funcionario.html";

    }

    else if (usuarioAtual.nivel === 2) {

        window.location.href = "gerente.html";

    }

    else if (usuarioAtual.nivel === 3) {

        window.location.href = "seguranca.html";

    }

}