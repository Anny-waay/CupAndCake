const container = document.getElementById('products-container');
const template_product = document.getElementById("product-template");
const template_error = document.getElementById("error-template");

async function addProductsInfo(products){
  try {
    container.innerHTML = '';
    let favouritesRequest = await getFavourites();
    for (const item of products){
      const product = template_product.content.cloneNode(true);
      let picture = product.getElementById('product-pic')
      picture.src = item.picture;
      let wishlist = product.getElementById('wishlist-btn')
      wishlist.src = "images/wishlist.png";
      if (favouritesRequest.status === 200){
        let favourites = await favouritesRequest.json();
        console.log(favourites)
        if (favourites.catalogProduct.some(x => x.id === item.id)){
          wishlist.src = "images/wishlist-red.png";
        }
      }
      let h4 = product.querySelectorAll("h4");
      h4[0].textContent = item.name;
      let span = product.querySelectorAll("span");
      span[0].textContent = item.price;
      let a = product.querySelectorAll("a");
      a[0].href = `javascript:showProductInfo(\"${item.id}\")`
      container.appendChild(product);
      wishlist.addEventListener("click", async function(){
        if (wishlist.getAttribute("src") === "images/wishlist.png"){
          await addToFavourites(item.id);
          wishlist.src = "images/wishlist-red.png"
        }
        else{
          await deleteFromFavourites(item.id)
          wishlist.src = "images/wishlist.png"}
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

  const products = await fetch(`/api/products/catalog?page=1&limit=30`)
    .then(response => response.json());

  addProductsInfo(products);
}

async function getProducts(type){
  container.innerHTML = '' + '<img src="../images/loading.gif" width="200" height="200" alt="mask">';

  const products = await fetch(`/api/products/catalog/type/${type}?page=1&limit=30`, {
    method: 'GET'
  })
    .then(response => response.json());

  addProductsInfo(products);
}