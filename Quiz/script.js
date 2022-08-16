//Dados iniciais:

let currentQuestion = 0; //quaestão atual
let correctAnswers = 0; //resposta corretas

showQuestion();

//Evento de reset:

document
  .querySelector(".scoreArea button")
  .addEventListener("click", resetEvent);

//Funções:

function showQuestion() {
  //mostrar questão
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion]; //abreviar var
    // console.log(q.question);

    //Math.floor() para arredondar a conta
    let pct = Math.floor((currentQuestion / questions.length) * 100); //calculo da porcentagem. entre() para resolver primeiro a divisão. length quantidade total
    document.querySelector(".progress--bar").style.width = `${pct}%`;

    document.querySelector(".scoreArea").style.display = "none"; //tirar area
    document.querySelector(".questionArea").style.display = "block"; //exibir area
    document.querySelector(".question").innerHTML = q.question; //exibir questão

    let optionsHTML = ""; //em aberto para receber depois do loop
    for (let i in q.options) {
      optionsHTML += `<div data-op='${i}' class='option'><span>${
        parseInt(i) + 1
      }</span>${
        //div class= para herdar as propriedades
        q.options[i] //parseInt no i para entender como número
      }</div>`; //+= acrecenta ao já existente. Add a var o resul. do loop
    }

    document.querySelector(".options").innerHTML = optionsHTML; // add ao html o valor da var criada.

    document.querySelectorAll(".options .option").forEach((item) => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    finishQuiz(); //acabaram as questões
  }
}

//saber em qual opção clicou:
function optionClickEvent(e) {
  // console.log("clicou em", e.target.getAttribute("data-op"));

  //verificar se a questão foi acertada(answer):

  let clickedOption = parseInt(e.target.getAttribute("data-op")); //parseInt para transformar string(data-op) em num.
  if (questions[currentQuestion].answer === clickedOption) {
    // console.log("acertou");
    correctAnswers++; //add 1 ao acertar questão.
  } //independente se acertou ou não:

  currentQuestion++; //add 1 para ir para proxima questão
  showQuestion(); //atualizar ir para proxima questão
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100); //calculo de resultado

  //mudança de cores e mensagens no resultado:

  if (points < 30) {
    document.querySelector(".scoreText1").innerHTML = "Ta ruim hein!";
    document.querySelector(".scorePct").style.color = "#FF0000";
  } else if (points >= 30 && points < 70) {
    document.querySelector(".scoreText1").innerHTML = "Muito bom!";
    document.querySelector(".scorePct").style.color = "#FFFF00";
  } else if (points >= 70) {
    document.querySelector(".scoreText1").innerHTML = "Parabéns!";
    document.querySelector(".scorePct").style.color = "#0D630D";
  }

  document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`; //exibir pct de acertos

  document.querySelector(
    ".scoreText2"
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`; //exibir quantidade de acertos

  //esconder area de questões e exibie area de resultado:
  document.querySelector(".scoreArea").style.display = "block"; //exibir area resultado
  document.querySelector(".questionArea").style.display = "none"; //tirar area questão
  document.querySelector(".progress--bar").style.width = "100%"; // completar barra progresso (manualmete)
}

function resetEvent() {
  //zera tudo
  currentQuestion = 0;
  correctAnswers = 0;
  showQuestion();
}
