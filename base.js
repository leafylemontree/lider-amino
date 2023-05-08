const default_menu = `
    <div class="menu">
      <div id="menuBar">
        <div class="menuLinkList">
          <img src="assets/logo.svg"/>
          <h2>LÍDER AMINO</h2>
          <a href="index.html">
              <img src="assets/home.svg" />
              <p>Inicio</p>
          </a>
          <a href="resume.html">
              <img src="assets/resume.svg" />
              <p>Resumen</p>
          </a>
          <a href="blogs.html">
              <img src="assets/blogs.svg" />
              <p>Blogs</p>
          </a>
          <a href="faq.html">
              <img src="assets/faq.svg" />
              <p>FAQ</p>
          </a>
          <a href="recent.html">
              <img src="assets/recent.svg" />
              <p>Novedades</p>
          </a>
          <a href="search.html">
              <img src="assets/search.svg" />
              <p>Buscar</p>
          </a>
          <h2></h2>
          <h2 class="littleInfo">2023</h2>
      </div>
      <button id="menuToggle">
        <img src="assets/menuButton.svg" />
      </button>
    </div>
`

const default_contact = `
      <h4>Creado por: Leafy. Dev build: 1.0.1. Actualizada: 8 de mayo de 2023</h4>
      <div id="links">
        <a href="https://aminoapps.com/c/lider-espanol">Líder Amino</a>
        <a href="https://www.youtube.com/@aminoapps">Youtube</a>
        <a href="https://github.com/leafylemontree/lider-amino">Github</a>
      </div>
`

document.querySelector(".menuContainer").innerHTML += default_menu;
document.querySelector(".contact").innerHTML += default_contact;



let menuToggle = document.querySelector("#menuToggle")
let menuBar    = document.querySelector("#menuBar")
let blurable   = document.querySelector(".blurable")

let menuStatus = 0;


function menuChange(type){
  if ((menuStatus == 0) & (type == 1)){
    return;
  };
  menuStatus = (menuStatus + 1) % 2;
  menuBar.classList.toggle("menuVisible")

  const blurableAll = document.querySelectorAll(".blurable")
  switch(menuStatus){
      case 0  :
                for(let i = 0; i < blurableAll.length; i++){
                  blurableAll[i].style.filter   = "blur(0px)";
                  blurableAll[i].style.opacity  = "100%";
                };
                menuBar.style.width     = "0px";
                break;
      case 1  :
                for(let i = 0; i < blurableAll.length; i++){
                  blurableAll[i].style.filter = "blur(4px)";
                  blurableAll[i].style.opacity = "70%";
                };
                menuBar.style.width     = "420px";
                break;
  };

}

menuToggle.addEventListener("click", ()=>{
  menuChange(0);
});

blurable.addEventListener("click", ()=>{
  menuChange(1);
});


// Key Listener

let keyContext = [];

function keyListener(fn, args, key){
  for(let i = 0; i < keyContext.length; i++){
    if(keyContext[i][1] != key){ continue; };
    throw new Error("Key already defined!")
  };
  keyContext.push([fn, args, key]);
}

document.addEventListener("keydown", ()=>{
  const key      = event.keyCode
  let   executed = false;
  for(let i = 0; i < keyContext.length; i++){
    let func = keyContext[i][0];
    let args = keyContext[i][1];
    let psky = keyContext[i][2];
    if(psky != key){ continue; };
    try{
      func(args);
      executed = true;
    } catch(e) {
      executed = null;
      console.error(e)
    };
  };
  if(!executed){
    // console.log(`No key found for ${key}`)
  }
});

keyListener(menuChange, 0, 17);
