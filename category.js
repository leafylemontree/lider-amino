let category      = parseInt(document.querySelector("p.ct").textContent, 10);
const kwContainer = document.querySelector("#keywordSelector");

const createButton = (dom, text, i) => {
  dom.innerHTML += `<button class="kw-${i} sc-btn">${text}</button>\n`
}

const getCategory = ()=>{
  category    = parseInt(document.querySelector("p.ct").textContent, 10);
  console.log(category)
}

let allBlogs = [[], 0]

function refreshKW(){
  getCategory();
  kwContainer.innerHTML = ""
  return;
  if(category == -1){ return; };
  for(let i = 0; i < keywords[category].length; i++){
    createButton(kwContainer, keywords[category][i], i);
  };
}

refreshKW()

const kwButtons = document.querySelector("#keywordSelector")
kwButtons.addEventListener("click", ()=>{
    button = document.querySelector("#keywordSelector button:hover")
    button.classList.toggle("btn-pressed")
})


const prepareSearch = ()=>{
  if (category != -1){
    button = document.querySelectorAll(".btn-pressed")
    let kwList = []
    for(let j = 0; j < button.length; j++){
      kwList.push(button[j].classList[0].slice(3))
    };
  };

  const prompt = document.querySelector("input.search").value
  refreshBlogs(prompt, null)
}


document.querySelector(".sc-btn").addEventListener("click", ()=>{
  prepareSearch();
});

keyListener(prepareSearch, null, 13);



// Blogs


const blogList = document.querySelector(".blogList")

function refreshBlogs(searchQuery, keywords){
    getCategory();

    let searchQueryUpper = null
    if (!!searchQuery){
      searchQueryUpper = searchQuery.toUpperCase()
      blogList.innerHTML = `<h3>Resultados para: "${searchQuery}"</h3>`
    } else {
      blogList.innerHTML = `<h3>Listado de blogs</h3>`
    }

    newHTML = []
    let aBlogs = []

    if(category == -1){
      aBlogs = allBlogs;
      category     = 0;
    } else {
      aBlogs = blogs;
    };

    for(let i = 0; i < aBlogs[category].length; i++){
      let blog    = aBlogs[category][i][1];
      let tags    = aBlogs[category][i][0];

      if (!!searchQuery){
        let blogContentUpper = blog.toUpperCase().replace(/\((http).*\)|[%!¡?¿\[\]\(\)<>]/gi, "")
        if (!blogContentUpper.includes(searchQueryUpper)){
          continue;
        };
      };

      let tArray  = blog.split(/[%[)]/g)
      let outTxt  = ""
      let link = "";
      let text = "";

      for(let j = 0; j < tArray.length; j++){

        if( tArray[j].match(/[%\]()]/)) {
          let elem = tArray[j].split(/[%\](]/g);
          text = elem[0]
          link = elem[2]
          outTxt += text;
        }
        else{ outTxt += tArray[j] };
      };
      newHTML.push([link, outTxt])
    };

    newHTML.sort((a,b)=>{
      function separate(s){
        return s[1].replace(/<(?:.*?)>|[%!¡?¿\[\]\(\)<>]/g, '').trim()
      };
      return separate(a).localeCompare(separate(b))

    })

    oldChar = ''
    for(let i = 0; i < newHTML.length; i++){
        let char = newHTML[i][1].replace(/<(?:.*?)>|[%!¡?¿\[\]\(\)<>]/g, '').trim()[0];
        if (char != oldChar){
            blogList.innerHTML += `<h4>${char}</h4>\n<div class="separatorBlog"></div>\n`;
        };
        link = newHTML[i][0]
        text = newHTML[i][1]
        if(searchQuery){
          let rgx = new RegExp(searchQuery, "gi")
          text = text.replace(rgx, `<u class="queryHighlight">${searchQuery}</u>`)
        };
        blogList.innerHTML += `<p><a href="${link}">${text}</a></p>\n`
        oldChar = char;
    };
}



getCategory()
if(category == -1){
  const uri   = (location.href.split("?"))
  let query   = null;
  if (uri.length > 1){
    query = decodeURI(uri[1])
    document.querySelector("input.search").value = query;
  };
  refreshBlogs(query, null)

  for(let i = 0; i < blogs.length; i++){
      Array.prototype.push.apply(allBlogs[0], blogs[i]);
  };
  refreshBlogs(query, null)
} else {
  refreshBlogs(null, null)
};





/*

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
*/
