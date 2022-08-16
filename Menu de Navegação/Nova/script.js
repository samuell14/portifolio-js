let menu = document.querySelector("#menu-area");
let menuOpener = document.querySelector("#menu-opener");

function mudarMenu() {
  if (menu.style.width == "0px") {
    menu.style.width = "200px";
  } else {
    menu.style.width = "0px";
  }
}

menuOpener.addEventListener("click", mudarMenu);
