const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

const jump = () => {
  mario.classList.add("jump"); //add class jump no mario

  setTimeout(() => {
    mario.classList.remove("jump"); //remover class jump no mario a cada 500ms
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft; //pegar deslocamento esq da img pipe a cada 10ms
  //pegar stilo computador na img do mario no caso o bottom:
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  //replace = converte 'px' para ''(vazio) apagar px | +para converte string para num

  //   console.log(marioPosition);

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none"; //se pos de pipe for meno ou igual a 120 pare animação
    pipe.style.left = `${pipePosition}px`; //recebe pos pipe parar pipe qdo mario encostar
    //para mario não sobrepor o cano quando bater:
    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./img-mario/game-over.png"; //mudar imagem qdo perder
    mario.style.width = "75px"; //mudar tamanho
    mario.style.marginLeft = "50px"; //mudar margem para aproximar

    clearInterval(loop); //parar execução do loop
  }
}, 10);

document.addEventListener("keydown", jump); //evento tecla discara função jump no mario
