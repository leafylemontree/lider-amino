let  clickableYear   = document.querySelectorAll(".year-letterbox");
let clickableMonth  = document.querySelectorAll(".month-letterbox");
const articleYear     = document.querySelectorAll(".article-year");
const articleMonth    = document.querySelectorAll(".article-month");

console.log(clickableYear.length)
console.log(clickableMonth.length)

for(let i = 0; i < clickableYear.length; i++){
  clickableYear[i].addEventListener("click", ()=>{
    let button = document.querySelector(".article-year:hover");
    button.classList.toggle("article-folded")
  });
};

for(let i = 0; i < clickableMonth.length; i++){
  clickableMonth[i].addEventListener("click", ()=>{
    let button = document.querySelector(".article-month:hover");
    button.classList.toggle("article-folded")
  });
};
