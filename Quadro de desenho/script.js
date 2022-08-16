//Dados iniciais:

let currentColor = "black"; //cor atual
let screen = document.querySelector("#tela");
let ctx = screen.getContext("2d"); //selecionar contexto para desenha dentro
let canDraw = false; //pode desenhar?
let mouseX = 0;
let mouseY = 0;

//Eventos:

document.querySelectorAll(".colorArea .color").forEach((item) => {
  //selecionar cada um dos elementos
  item.addEventListener("click", colorClickEvent); //add evento click
});

/*Passo a passo :
1- Quando o click do maose ABAIXAR, ative o modo desenho
2- Se o mouse se MOVER, se o modo desnho estiver ativado, desenhe.
3- Quando o click do mouse LEVANTAR, desative o modo desnho. */

screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMoveEvent);
screen.addEventListener("mouseup", mouseUpEvent);
document.querySelector(".clear").addEventListener("click", clearScreen);
//funções:

function colorClickEvent(e) {
  let color = e.target.getAttribute("data-color"); //armazenar alvo pelo atributo
  //console.log("cor clicada ", color);
  currentColor = color; //armazenar em cor atual

  document.querySelector(".color.active").classList.remove("active"); //remover ativador da cor
  e.target.classList.add("active"); //add ativador no alvo clicado
}

function mouseDownEvent(e) {
  //console.log("apertou mouse");
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft; // pq esse evente acontece antes do Move
  mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
  //console.log("moveu mouse");
  if (canDraw) {
    draw(e.pageX, e.pageY);
    /*let pointX = e.pageX - screen.offsetLeft; //pageX - definir onde será desenhado eixo X; offsetLeft - subtrair espaço esquerdo fora do elemento
    let pointY = e.pageY - screen.offsetTop; //pageY - definir onde será desenhado eixo y; offseTop - subtrair espaço acima fora do elemento
    console.log(pointX, pointY);*/
  }
}

function mouseUpEvent() {
  //console.log("soltou mouse");
  canDraw = false;
}

function draw(x, y) {
  //armazenando a posição que será desenhado
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  //comandos para desenhar se usa o contexto:

  ctx.beginPath(); //abrir desenho
  ctx.lineWidth = 5; //largura da linha
  ctx.lineJoin = "round"; //formato da linha (redondo)
  ctx.moveTo(mouseX, mouseY); //mover para posição inicial
  ctx.lineTo(pointX, pointY); //faça uma linha do ponto x ao y
  ctx.closePath(); //fechar desenho
  ctx.strokeStyle = currentColor; //cor da linha
  ctx.stroke(); //finalizar processo

  //armazenar o que foi desenhado
  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0); //zerar o processeo de desenho(num = matriz 2d)
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // rect - retangulo; limpa da posição 0 até o fim da largura e o fim da altura
}
