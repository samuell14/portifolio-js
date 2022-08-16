/*Exemplo de Target

document.querySelector(".neutralArea").addEventListener("click", (e) => {
//   console.log("TARGET", e.target);seleciona item especifico clicado
//   console.log("CURRENT TARGET", e.currentTarget);seleciona apenas item que possui o evento
});
*/

//PARTE LÓGICA:
let areas = {
  a: null,
  b: null,
  c: null,
};

//Eventos do itens:
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("dragstart", dragStart); //add evento começar a arrasta
  item.addEventListener("dragend", dragEnd); //add evento terminar de arrasta
});

//Eventos da Area:

document.querySelectorAll(".area").forEach((area) => {
  //toda area para soltar coisas deve ter esses 3 eventos
  area.addEventListener("dragover", dragOver);
  area.addEventListener("dragleave", dragLeave);
  area.addEventListener("drop", drop);
});

//eventos para area neutra (para voltar itens arrastados):
document
  .querySelector(".neutralArea")
  .addEventListener("dragover", dragOverNeutral);
document
  .querySelector(".neutralArea")
  .addEventListener("dragleave", dragLeaveNeutral);
document.querySelector(".neutralArea").addEventListener("drop", dropNeutral);

//Functions Iten

function dragStart(e) {
  e.currentTarget.classList.add("dragging"); //add class dragging com opacity
}

function dragEnd(e) {
  e.currentTarget.classList.remove("dragging"); //remover class dragging com opacity
}
//Functions Area:

function dragOver(e) {
  //ativada quando item é arrastado para a area determinada
  //   console.log("passou por cima");
  if (e.currentTarget.querySelector(".item") === null) {
    //para não add hover se area estiver ocupada
    e.preventDefault(); //evitar comportamento padrão para executar a function drop()
    e.currentTarget.classList.add("hover");
  }
}

function dragLeave(e) {
  //ativada quando item é arrastado para fora da area arrastável
  //   console.log("saiu de uma area dropável");
  e.currentTarget.classList.remove("hover");
}

function drop(e) {
  //   console.log("SOLTOU");
  e.currentTarget.classList.remove("hover");
  // console.log(dragItem);

  //console.log(e.currentTarget); verificar area arrastada

  //condição para verificar se a area esta vazia:

  //verificar se á alguma class item dentro da area ou não.
  if (e.currentTarget.querySelector(".item") === null) {
    let dragItem = document.querySelector(".item.dragging"); //armazenar item arrastado
    e.currentTarget.appendChild(dragItem); //appendChild = add um item no final ou dentro dele(dragItem) arrastado
    updateAreas();
  }
}

//
function dragOverNeutral(e) {
  e.preventDefault();
  e.currentTarget.classList.add("hover");
}

function dragLeaveNeutral(e) {
  e.currentTarget.classList.remove("hover");
}
function dropNeutral(e) {
  e.currentTarget.classList.remove("hover");
  let dragItem = document.querySelector(".item.dragging"); //armazenar item arrastado
  e.currentTarget.appendChild(dragItem); //appendChild = add um item no final ou dentro dele(dragItem) arrastado
  updateAreas();
}

//LOGIC FUNCTIONS:

function updateAreas() {
  document.querySelectorAll(".area").forEach((area) => {
    //selecionar os 3 quadrados da area
    let name = area.getAttribute("data-name"); //armazenar pelo atributo name

    if (area.querySelector(".item") !== null) {
      //se area estiver diferente de nula
      areas[name] = area.querySelector(".item").innerHTML; //name do objeto(areas) receber conteúdo de item
    } else {
      areas[name] = null; //senão houver itens recebe nulo
    }
  });
  // console.log(areas);exibir resultado

  //condiçao da sequância correta:
  if (areas.a === "1" && areas.b === "2" && areas.c === "3") {
    document.querySelector(".areas").classList.add("correct"); //add class correct
  } else {
    document.querySelector(".areas").classList.remove("correct"); //senão remove class correct
  }
}
