$(document).ready(function(){
  hideProductInfo();
});

const product_info_container = document.getElementById('product-info-container');
const template_product_info = document.getElementById("product-info-template");
const template_info_error = document.getElementById("product-info-error-template");

async function addProductInfo(id){
  product_info_container.innerHTML = '' + '<img src="../images/loading.gif" width="200" height="200" alt="mask">';

  const item = await fetch(`/api/products/product/${id}`, {
    method: 'GET'
  })
    .then(response => response.json());

  try {
    product_info_container.innerHTML = '';
    const info = template_product_info.content.cloneNode(true);
    let pic = info.getElementById("product-info-pic");
    pic.src = item.picture;
    let div = info.querySelectorAll("div");
    let divs = div[0].querySelectorAll("div");
    divs[0].textContent  = item.name;
    let span = divs[1].querySelectorAll("span");
    span[0].textContent = item.price;
    divs[2].textContent = "Состав: " + item.composition;
    divs[3].textContent = "Калорийность на 100г.: " + item.calories + "ккал.";
    divs[4].textContent = "Вес: " + item.weight + "г.";
    product_info_container.appendChild(info);
  } catch (e) {
    const error = template_info_error.content.cloneNode(true);
    while (product_info_container.firstChild) {
      product_info_container.removeChild(product_info_container.firstChild);
    }
    product_info_container.appendChild(error);
  }
}

function showProductInfo(id){
  addProductInfo(id);
  $("#product-info-container").show();
  $(".block-link").hide();
}

function hideProductInfo(){
  $("#product-info-container").hide();
  $(".block-link").show();
}
