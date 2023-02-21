const default_menu = `
    <div class="menu">
      <div id="menuBar">
        <div class="menuLinkList">
          <img src="assets/logo.svg"/>
          <h2>LÍDER AMINO</h2>
          <a href="index.html">
              <img src="" />
              <p>Inicio</p>
          </a>
          <a href="blogs.html">
              <img src="assets/blogs.svg" />
              <p>Blogs</p>
          </a>
          <a>
              <img src="assets/faq.svg" />
              <p>FAQ</p>
          </a>
          <a>
              <img src="assets/recent.svg" />
              <p>Novedades</p>
          </a>
          <a>
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
      <h4>Creado por: Leafy. Dev build: 0.0.5</h4>
      <div id="links">
        <a href="https://aminoapps.com/c/lider-espanol">Líder Amino</a>
        <a href="https://www.youtube.com/@aminoapps">Youtube</a>
        <a href="https://github.com/leafylemontree/lider-amino">Github</a>
      </div>
`

console.log(default_menu)
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
  switch(menuStatus){
      case 0  : blurable.style.filter   = "blur(0px)";
                blurable.style.opacity  = "100%";
                menuBar.style.width     = "0px";
                break;
      case 1  : blurable.style.filter = "blur(4px)";
                blurable.style.opacity = "70%";
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
