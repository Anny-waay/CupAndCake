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
      let wishlist = product.getElementById('wishlist-btn')
      wishlist.src = "images/wishlist.png";
      let favouritesRequest = await getFavourites();
      if (favouritesRequest.status === 200){
        let favourites = await favouritesRequest.json();
        if (favourites.specialProduct.some(x => x.id === item.id)){
          wishlist.src = "images/wishlist-red.png";
        }
      }
      let h4 = product.querySelectorAll("h4");
      h4[0].textContent = item.name;
      let span = product.querySelectorAll("span");
      span[0].textContent = item.prevPrice;
      span[1].textContent = item.newPrice;
      let a = product.querySelectorAll("a");
      a[0].href = `javascript:showSpecialInfo(\"${item.id}\")`;
      let button = product.getElementById("shopping-cart-btn");
      container.appendChild(product);
      wishlist.addEventListener("click", async function(){
        if (wishlist.getAttribute("src") === "images/wishlist.png"){
          await addProductToFavourites(item.productId);
          wishlist.src = "images/wishlist-red.png"
        }
        else{
          await deleteProductFromFavourites(item.productId)
          wishlist.src = "images/wishlist.png"}
      });
      button.addEventListener("click", async function(){
        await addProductToShoppingCart(item.productId);
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