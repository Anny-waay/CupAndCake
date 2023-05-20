const container = document.getElementById('products-container');
const template_product = document.getElementById("product-template");
const template_error = document.getElementById("error-template");
const numberPerPage = 6;
let pageNumber = 1;

async function fillProductsTemplate(products){
  try {
    container.innerHTML = '';
    let page = document.getElementById("page-number");
    page.textContent = pageNumber;
    for (const item of products){
      const product = template_product.content.cloneNode(true);
      let picture = product.getElementById('product-pic')
      picture.src = item.picture;
      let wishlist = product.getElementById('wishlist-btn')
      wishlist.src = "images/wishlist.png";
      let favouritesRequest = await getFavourites();
      if (favouritesRequest.status === 200){
        let favourites = await favouritesRequest.json();
        if (favourites.catalogProduct.some(x => x.id === item.id)){
          wishlist.src = "images/wishlist-red.png";
        }
      }
      let h4 = product.querySelectorAll("h4");
      h4[0].textContent = item.name;
      let span = product.querySelectorAll("span");
      span[0].textContent = item.price;
      let a = product.querySelectorAll("a");
      a[0].href = `javascript:showProductInfo(\"${item.id}\")`;
      let button = product.getElementById("shopping-cart-btn");
      container.appendChild(product);
      wishlist.addEventListener("click", async function(){
        if (wishlist.getAttribute("src") === "images/wishlist.png"){
          let status = await addProductToFavourites(item.id);
          if (status === 201)
            wishlist.src = "images/wishlist-red.png"
          if (status === 401)
            window.alert("Авторизируйтесь, чтобы добавлять товары в избранное")
        }
        else{
          await deleteProductFromFavourites(item.id)
          wishlist.src = "images/wishlist.png"}
      });
      button.addEventListener("click", async function(){
        let status = await addProductToShoppingCart(item.id);
        if (status === 401)
          window.alert("Авторизируйтесь, чтобы добавлять товары в корзину")
      });
    }
  } catch (e) {
    const error = template_error.content.cloneNode(true);
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(error);
  }
}
async function getAllProducts(){
  container.innerHTML = '' + '<img src="../images/loading.gif" width="200" height="200" alt="mask">';

  let products = await fetch(`/api/products/catalog?page=${pageNumber}&limit=${numberPerPage}`)
    .then(response => response.json());

  const prev = document.getElementById('prev');
  prev.addEventListener('click', async (e) => {
    e.preventDefault();
    if (pageNumber > 1) {
      pageNumber--;
      let products = await fetch(`/api/products/catalog?page=${pageNumber}&limit=${numberPerPage}`)
        .then(response => response.json());
      fillProductsTemplate(products);
    }
  });

  const next = document.getElementById("next");
  next.addEventListener("click", async (e) => {
    e.preventDefault();
    pageNumber++;
    let response = await fetch(`/api/products/catalog?page=${pageNumber}&limit=${numberPerPage}`);

    if (response.status === 200){
      let products = await response.json();
      fillProductsTemplate(products);
    }
    else{
      pageNumber--;
    }
  });

  fillProductsTemplate(products);
}

async function getProducts(type){
  container.innerHTML = '' + '<img src="../images/loading.gif" width="200" height="200" alt="mask">';

  const products = await fetch(`/api/products/catalog/type/${type}?page=1&limit=30`, {
    method: 'GET'
  })
    .then(response => response.json());

  const prev = document.getElementById('prev');
  prev.addEventListener('click', async (e) => {
    e.preventDefault();
    if (pageNumber > 1) {
      pageNumber--;
      let products = await fetch(`/api/products/catalog/type/${type}?page=${pageNumber}&limit=${numberPerPage}`)
        .then(response => response.json());
      fillProductsTemplate(products);
    }
  });

  const next = document.getElementById("next");
  next.addEventListener("click", async (e) => {
    e.preventDefault();
    pageNumber++;
    let response = await fetch(`/api/products/catalog/type/${type}?page=${pageNumber}&limit=${numberPerPage}`);

    if (response.status === 200){
      let products = await response.json();
      fillProductsTemplate(products);
    }
    else{
      pageNumber--;
    }
  });

  fillProductsTemplate(products);
}

