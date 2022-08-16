const lamp = document.querySelector("#lamp");
const turnOn = document.querySelector("#turnOn");
const turnOff = document.querySelector("#turnOff");

function estaQuebrada() {
  return lamp.src.indexOf("quebrada") > -1; //indexOf= verifica uma string entre(...), 'quebrada'. -para ativar a fun
}

function ligarLamp() {
  if (!estaQuebrada()) {
    //se fun estaQuebrada NÃO estiver ativada liga lampada
    lamp.src = "imagens-lampada/ligada.jpg";
  }
}

function desligarLamp() {
  if (!estaQuebrada()) {
    //se fun estaQuebrada NÃO estiver ativada desliga lampada
    lamp.src = "imagens-lampada/desligada.jpg";
  }
}

function quebrarLamp() {
  lamp.src = "imagens-lampada/quebrada.jpg";
}

turnOn.addEventListener("click", ligarLamp);
turnOff.addEventListener("click", desligarLamp);
lamp.addEventListener("mouseover", ligarLamp);
lamp.addEventListener("mouseleave", desligarLamp);
lamp.addEventListener("dblclick", quebrarLamp);
