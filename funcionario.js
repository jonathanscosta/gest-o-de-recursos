// ======================================================
// ÁREA DO FUNCIONÁRIO
// INDÚSTRIAS WAYNE
// ======================================================

// ======================================================
// RECUPERAR USUÁRIO SALVO
// ======================================================

const usuarioAtual =
JSON.parse(
localStorage.getItem("usuarioAtual")
);

// ======================================================
// VERIFICAR SE EXISTE USUÁRIO
// ======================================================

if (!usuarioAtual) {

```
window.location.href = "index.html";
```

}

// ======================================================
// VERIFICAR NÍVEL DE ACESSO
// ======================================================

if (usuarioAtual.nivel !== 1) {

```
window.location.href = "index.html";
```

}

// ======================================================
// SELECIONAR ELEMENTOS
// ======================================================

const nomeUsuario =
document.querySelector("#nome-usuario");

const funcaoUsuario =
document.querySelector("#funcao-usuario");

const avatarUsuario =
document.querySelector("#avatar-usuario");

const nomeBoasVindas =
document.querySelector("#nome-boas-vindas");

const botaoSair =
document.querySelector("#botao-sair");

// ======================================================
// MOSTRAR INFORMAÇÕES DO USUÁRIO
// ======================================================

nomeUsuario.textContent =
usuarioAtual.nome;

funcaoUsuario.textContent =
usuarioAtual.funcao;

avatarUsuario.textContent =
usuarioAtual.nome.charAt(0);

nomeBoasVindas.textContent =
usuarioAtual.nome.split(" ")[0];

// ======================================================
// BOTÃO SAIR
// ======================================================

botaoSair.addEventListener(
"click",
function() {

```
    localStorage.removeItem(
        "usuarioAtual"
    );


    window.location.href =
        "index.html";

}
```

);
