let category    = parseInt(document.querySelector("p.ct").textContent, 10);
const kwContainer = document.querySelector("#keywordSelector");

const createButton = (dom, text, i) => {
  dom.innerHTML += `<button class="kw-${i}">${text}</button>\n`
}

function refreshKW(){
  kwContainer.innerHTML = ""
  for(let i = 0; i < keywords[category].length; i++){
    createButton(kwContainer, keywords[category][i], i);
  };
}

refreshKW()

function refreshKeywords(){
const kwButtons = document.querySelector("#keywordSelector")
kwButtons.addEventListener("click", ()=>{
    button = document.querySelector("#keywordSelector button:hover")
    button.classList.toggle("btn-pressed")
  })
}

document.querySelector(".sc-btn").addEventListener("click", ()=>{
  button = document.querySelectorAll(".btn-pressed")
  let kwList = []
  for(let j = 0; j < button.length; j++){
    kwList.push(button[j].classList[0].slice(3))
  };

  const prompt = document.querySelector("input.search").value
  refreshBlogs(prompt, null)
});

// Blogs

const blogList = document.querySelector(".blogList")

function refreshBlogs(searchQuery, keywords){
    let searchQueryUpper = null
    if (!!searchQuery){
      searchQueryUpper = searchQuery.toUpperCase()
      blogList.innerHTML = `<h3>Resultados para: "${searchQuery}"</h3>`
    } else {
      blogList.innerHTML = `<h3>Listado de blogs</h3>`
    }
    newHTML = []

    for(let i = 0; i < blogs[category].length; i++){
      let blog    = blogs[category][i][1];
      let tags    = blogs[category][i][0];

      if (!!searchQuery){
        let blogContentUpper = blog.toUpperCase()
        if (!blogContentUpper.includes(searchQueryUpper)){
          continue;
        };
      };

      let tArray  = blog.split(/[%[)]/g)
      let outTxt  = []

      for(let j = 0; j < tArray.length; j++){

        if( tArray[j].match(/[%\]()]/)) {
          let elem = tArray[j].split(/[%\](]/g);
          let text = elem[0]
          let link = elem[2]
          outTxt.push(`<a href='${link}'>${text}</a>`)
        }
        else{ outTxt.push(tArray[j]) };
      };
      newHTML.push(outTxt.join(" "))
    };

    newHTML.sort((a,b)=>{
      function separate(s){
        return s.replace(/[%[!¡?¿\]]|<(?:.*?)>/g, '').trim()
      };
      return separate(a).localeCompare(separate(b))

    })

    oldChar = ''
    for(let i = 0; i < newHTML.length; i++){
        let char = newHTML[i].replace(/[%[!¡?¿\]]|<(?:.*?)>/g, '').trim()[0];
        if (char != oldChar){
            blogList.innerHTML += `<h4>${char}</h4>\n<div class="separatorBlog"></div>\n`;
        };
        blogList.innerHTML += `<p>${newHTML[i]}</p>\n`;
        oldChar = char;
    };
}

refreshBlogs(null, null)








document.querySelector(".devDebug button#decrease").addEventListener("click", ()=>{
  category -= 1;
  if (category < 0){ category = 11 };
  refreshBlogs(null, null)
  document.querySelector(".devDebug p:nth-child(2)").textContent = category;
  refreshKW()
})

document.querySelector(".devDebug button#increase").addEventListener("click", ()=>{
  category += 1;
  if (category > 11){ category = 0 };
  refreshBlogs(null, null)
  document.querySelector(".devDebug p:nth-child(2)").textContent = category;
  refreshKW()

})
