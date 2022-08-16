//add evento ao enviar formulário. async para ativar modo assíncrono:
document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault(); //previne comportamento padrão(enviar formulário) para não perder o que foi digitado

  let input = document.querySelector("#searchInput").value; //armazenar valor digitano no input
  //   console.log(input);
  //se input for diferente ou igual vazio. Para não armazenar vazio quando não for digitado nada
  if (input !== "") {
    clearInfo(); //executar a função limpar aviso
    showWarning("Carregando...");
    //encodeURI para transforma em padrã url
    let url = `https://api.openweathermap.org/data/2.5/weather?q=
    ${encodeURI(
      input
    )}&units=metric&lang=pt_br&appid=4c875037fef0d67f729ed6481bcccf9c`; //4c875037fef0d67f729ed6481bcccf9c

    let results = await fetch(url); //await para esperar resultado do codigo assincrono.

    //transformar resultado em objeto:

    let json = await results.json();
    // console.log(jason);
    //verificar se foi digitada localização real (cod:200):
    if (json.cod === 200) {
      showInfo({
        //objeto json
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon, //[0]pq é tem array dentro
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo(); //executar a função limpar aviso
      showWarning("Não encontramos esta localização.");
    }
  } else {
    clearInfo(); //executar a função limpar aviso
  }
});

function showInfo(json) {
  //função de exibição
  showWarning("");

  document.querySelector(".titulo").innerHTML = `${json.name},${json.country}`; //exibir nome
  document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`; //exibir graus
  document.querySelector(
    ".ventoInfo"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`; //exibir vento
  document
    .querySelector(".temp img") //exibir imagem(foi usada imagem fake para ser trocada)
    .getAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png"`
    );

  document.querySelector(".ventoPonto").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`; //exibir ponteiro vento

  document.querySelector(".resultado").style.display = "block"; //exibir resultado
}

function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg; //manda msg de aviso para if
}

//função limpar aviso:
function clearInfo() {
  showWarning(""); //limpar msg de aviso
  document.querySelector(".resultado").style.display = "none"; //ocultar resultado
}
