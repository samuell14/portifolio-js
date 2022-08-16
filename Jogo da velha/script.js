//dados iniciais do jogos
let square = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
}; //objeto com todas as casas
let player = ""; //vez
let warning = ""; //vencedor
let playing = false; //jogador

reset();

//eventos

document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
  //forEach para todos add evento click
  item.addEventListener("click", itemClick);
});

//funções que veriquicam os eventos

function itemClick(event) {
  let item = event.target.getAttribute("data-item"); //armazenar o alvo do click pelo atributo data-item
  if (playing && square[item] === "") {
    square[item] = player;
    renderSquare();
    togglePlayer();
  }
}

function reset() {
  warning = "";
  let random = Math.floor(Math.random() * 2); //criar núm aleatorio entre 0 e 1. floor arredonda pra baixo

  if (random === 0) {
    player = "x";
  } else {
    player = "o";
  } //cond.para escolher vez do jogador

  for (let i in square) {
    square[i] = "";
  } // loop para limpar tds as casas na memória

  playing = true; //para limpar tds as casas na memória

  renderSquare();
  renderInfo();
}

function renderSquare() {
  //verificar onde tem uma marca e add no html
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }
  checkGame(); //para verificar resultado a cada loop
}

function renderInfo() {
  //mudar informação do rodapé
  document.querySelector(".vez").innerHTML = player;
  document.querySelector(".resultado").innerHTML = warning;
}

function togglePlayer() {
  //alternar jogador
  player = player === "x" ? "o" : "x"; // player recebe; se player for x recebe o se não recebe x
  /*if (player === "x") {
    player = "o";
  } else {
    player = "x";
  }*/
  renderInfo();
}

function checkGame() {
  //verificar os 4 possiveis resultados
  if (checkWinnerFor("x")) {
    warning = 'O "x" venceu';
    playing = false;
  } else if (checkWinnerFor("o")) {
    warning = 'O "o" venceu';
    playing = false;
  } else if (isFull()) {
    warning = "Deu empate";
    playing = false;
  }
}

function checkWinnerFor(player) {
  let pos = [
    //possibilidades:
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];
  //verificação:
  for (let w in pos) {
    let pArray = pos[w].split(","); //verificar itens separados por ",". Split cria um array com os item separados.
    let hasWon = pArray.every((options) => {
      //every é o método executa uma função para cada elemento do array
      if (square[options] === player) {
        return true;
      } else {
        return false;
      }
    });
    if (hasWon) {
      return true;
    }
  }
  return false;
}

function isFull() {
  // empate verificar se alguns esta vazio
  for (let i in square) {
    if (square[i] === "") {
      return false;
    }
  }
  return true;
}
