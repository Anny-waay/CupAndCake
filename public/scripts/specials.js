const container = document.getElementById('specials-container');
const template_product = document.getElementById("special-template");
const template_error = document.getElementById("error-template");

async function getSpecials(){
  const products = await fetch(`/api/products/specials`)
    .then(response => response.json());

  container.innerHTML = '' + '<img src="../images/loading.gif" width="200" height="200" alt="mask">';

  try {
    container.innerHTML = '';
    for (const item of products){
      const product = template_product.content.cloneNode(true);
      let picture = product.getElementById('special-pic')
      picture.src = item.picture;
      let h4 = product.querySelectorAll("h4");
      h4[0].textContent = item.name;
      let span = product.querySelectorAll("span");
      span[0].textContent = item.prevPrice;
      span[1].textContent = item.newPrice;
      container.appendChild(product);
    }
  } catch (e) {
    const error = template_error.content.cloneNode(true);
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(error);
  }
}