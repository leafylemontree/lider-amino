const button = document.querySelector("button.search")
const uInput = document.querySelector("input.search")
const search = () => {
  const query = uInput.value;
  if (!query) { alert("La entrada no puede estar vacía"); };
  const url = `${location.href.split("/").slice(0,-1).join("/")}/search.html?${query}`
  location.assign(url)
};

button.addEventListener("click", search);
keyListener(search, null, 13)
